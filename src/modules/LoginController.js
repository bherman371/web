import Auth from '../modules/Auth'
import Global from '../constants/Global.js'

const URL = Global.getServerDomain() + '/login'

var PARAM = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    // email: this.credentials.email,
    username: '',
    password: ''
  }
  )
}

class LoginController {

  constructor () {
    this.email = ''
    this.password = ''
  }

  static validateCredential = function () {
    if (!this.email === '' && !this.password === '') {
      // login user
      return true
    } else {
      // Prompt user to enter credentials
      alert('Please enter the credentials!')
      return false
    }
  }

  static checkLoginAPI = function () {
    fetch(URL, PARAM)
      .then(function (res) {
        var jObj = res.json()
        if (jObj.error) {
          alert('error!')
        }
      })
      .then(function (status) {
        if (status.token) {
          Auth.authenticateUser(status.token)
          self.startSession(status.user)
          self.$router.push('/user')
        }
      })
  }

}

export default LoginController
