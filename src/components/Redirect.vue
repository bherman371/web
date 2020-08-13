<template>
<div></div>
</template>

<script>

import Auth from '@/modules/Auth'
import { mapActions } from 'vuex'
import Global from '@/constants/Global.js'

export default {
  name: 'Redirect',
  data () {
    return {
    }
  },
  created () {
    console.log('Redirect')
    let self = this
    let type = self.$route.query.type
    var query = self.$route.query
    var userId = localStorage.getItem('user_id')
    if (userId) {
      self.deauth()
      // reload
      location.reload()
    } else {
      console.log(type);
      switch (type) {
        case 'activation':
          self.$router.push(`/activation?id=${query.user}`)
          break
        case 'password':
          self.$router.push(`/password-reset?user_id=${query.user_id}&token=${query.token}`)
          break
        case 'facebook':
          self.facebookTokenVerification(query.token)
          break
        case 'emailChange':
          self.commonTokenVerification(query.token)
          break
        default:
          self.$router.push('/')
          break
      }
    }
  },
  methods: {
    ...mapActions([
      'endSession',
      'startSession',
      'getAllGroups'
    ]),
    commonTokenVerification (token) {
      console.log('token verification')
      let self = this
      fetch(Global.getServerDomain() + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      }).then(response => response.json())
      .then(response => {
        if (response.result) {
          localStorage.setItem('token', token)
          self.startSession(response.id)
          self.getAllGroups()
          self.$router.push('/profile-page/' + response.id)
        }
      })
    },
    deauth () {
      let self = this
      console.log('deauth')
      Auth.deauthenticateUser()
      localStorage.removeItem('user_id')
      console.log(localStorage.getItem('user_id'))
      self.endSession()
    },
    facebookTokenVerification (token) {
      console.log('facebook auth')
      let self = this
      fetch(Global.getServerDomain() + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      }).then(response => response.json())
        .then(response => {
          if (response.result) {
            // break
            localStorage.setItem('token', token)
            self.startSession(response.id)
            self.getAllGroups()
            if (response.activated === 1) {
              self.$router.push('/s-app/news-feed')
            } else if (response.activated === 2) {
              fetch(Global.getServerDomain() + `/reactivation`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth_key': Auth.getToken()
                },
                body: JSON.stringify({
                  id: response.id
                })
              })
              .then(res => res.json())
              .then(function () {
                self.$router.push({
                  name: 'detail-child',
                  params: { id: response.id },
                  query: { 'feature': 'reactivation' }
                })
              })
            } else {
              self.$router.push('/activation?facebook=true&id=' + response.id)
            }
          }
        })
    }
  }
}

</script>

