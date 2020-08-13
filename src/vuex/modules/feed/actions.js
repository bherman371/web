import Auth from '../../../modules/Auth'
import Global from '../../../constants/Global.js'

export function fetchFeed ({commit}){
    fetch(Global.getServerDomain() + `/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    commit('feed', payload)
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function replyToGroupMember({commit}, msg) {
  console.log(msg)
  fetch(Global.getServerDomain() + `/messages/group/moderator/${msg._group.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: msg.newMessage,
      receiver: msg._sUser.id
    })
  }).catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function replyToGroupMessage({commit}, msg){
  fetch(Global.getServerDomain() + `/messages/group/${msg.groupId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: msg.newMessage,
      isModerator: false
    })
  }).catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function replyToItemComment({commit}, msg){
  fetch(Global.getServerDomain() + `/messages/item/${msg.itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: msg.newMessage
    })
  }).catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function declineInvite ({commit}, invite) {
  fetch(Global.getServerDomain() + `/group/${invite.groupId}/declinejoininvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function acceptModerationInvitation({commit}, invite) {
  fetch(Global.getServerDomain() + `/group/${invite.groupId}/acceptmoderatorinvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function declineModerationInvitation({commit}, invite) {
  fetch(Global.getServerDomain() + `/group/${invite.groupId}/rejectmoderatorinvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function replyToModerator({commit}, msg){
  fetch(Global.getServerDomain() + `/messages/group/member/${msg.group.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: msg.newMessage
    })
  }).catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function acceptRequestToJoin({commit}, request) {
  fetch(Global.getServerDomain() + `/group/${request.groupId}/acceptjoinrequest`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: request.sUserId
    })
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function declineRequestToJoin({commit}, request) {
  fetch(Global.getServerDomain() + `/group/${request.groupId}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: request.sUserId
    })
  })
  .catch(error => console.error(error))
}

// eslint-disable-next-line no-unused-vars
export function replyToUser({commit}, msg) {
  fetch(Global.getServerDomain() + `/messages/user/${msg.receiverId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: msg.newMessage
    })
  }).catch(error => console.error(error))
}
