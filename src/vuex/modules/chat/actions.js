import Auth from '../../../modules/Auth.js'
import Global from '../../../constants/Global.js'

export function fetchUserMessages({ commit }) {
  fetch(Global.getServerDomain() + `/messages/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  }).then(function (res) {
    return res.json()
  })
    .then(function (json) {
      return json
    })
    .then(function (payload) {
      for (let i = 0; i < payload.length; i++) {
        payload[i].isOpen = false
      }
      commit('set_user_messages', payload)
    })
    .catch(error => console.error(error))
}

export async function postUserMessage({ commit, dispatch }, { message, id, postMsg, newChat }) {
  let usrMsg = postMsg.trim();
  try {
    const result = await fetch(Global.getServerDomain() + `/messages/user/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken(),
        "charset": "utf8mb4"
      },
      body: JSON.stringify({
        msg: usrMsg
      })
    }).then(function (res) {
      return res.json()
    }).then(function (payload) {
      if (message) {
        message.receiver.newMessage = payload
        commit('send_user_message', message.receiver)
      }
      if (newChat) dispatch("fetchUserMessages")

    }).catch(error => console.error(error))
    return result;
  } catch (error) {
    console.log(error)
  }
}

export function openUserChat({ commit, state }, user) {
  let chats = state.userMessages
  for (let i = 0; i < chats.length; i++) {
    if (user.id === chats[i].id) {
      commit('open_user_chat', chats[i])
      return
    }
  }
  commit('new_user_chat', user)
}

export function fetchModeratorMessagesAsMember({ commit }) {
  fetch(Global.getServerDomain() + `/messages/group/member`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  }).then(function (res) {
    return res.json()
  })
    .then(function (json) {
      return json
    })
    .then(function (payload) {
      for (let i = 0; i < payload.length; i++) {
        payload[i].isOpen = false
      }
      commit('set_moderator_messages_member', payload)
    })
    .catch(error => console.error(error))
}

export function fetchModeratorMessagesAsModerator({ commit }) {
  fetch(Global.getServerDomain() + `/messages/group/moderator`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  }).then(function (res) {
    return res.json()
  })
    .then(function (json) {
      return json
    })
    .then(function (payload) {
      commit('set_moderator_messages_moderator', payload)
    })
    .catch(error => console.error(error))
}

export function postModeratorMessageAsMember({ commit }, message) {
  fetch(Global.getServerDomain() + `/messages/group/member/${message.group.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: message.data.text
    })
  }).then(function (res) {
    return res.json()
  }).then(function (payload) {
    message.group.newMessage = payload
    commit('send_moderator_message_member', message.group)
  }).catch(error => console.error(error))
}

export function postModeratorMessageAsModerator({ commit }, message) {
  fetch(Global.getServerDomain() + `/messages/group/moderator/${message.group.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: message.data.text,
      receiver: message.receiver.id
    })
  }).then(function (res) {
    return res.json()
  }).then(function (payload) {
    message.receiver.newMessage = payload
    commit('send_moderator_message_moderator', message.receiver)
  }).catch(error => console.error(error))
}

export function openModeratorChatMember({ commit, state }, group) {
  let chats = state.moderatorMessagesAsMember
  for (let i = 0; i < chats.length; i++) {
    if (group.id === chats[i].id) {
      commit('open_moderator_chat', chats[i])
      return
    }
  }
  commit('new_moderator_chat', group)
}

export function closeUserChat({ commit }, user) {
  commit('close_user_chat', user)
}

export function closeModeratorChat({ commit }, group) {
  console.log('close')
  commit('close_moderator_chat', group)
}

export function setNewMsgsCounter({ commit }, amount) {
  commit('set_new_message_counter', amount);
}

export function setPopupChat({ commit }, { isOpen, chatMsgs }) {
  commit('set_window_chat_state', { value: isOpen, msgs: chatMsgs });
}

export async function sendAttachment({ commit, dispatch }, { userId, file, message, newChat }) {
  const data = new FormData();
  data.append("image", file);
  let responseStatus = "";
  const result = await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/images/user/messages/${userId}`, {
      method: 'POST',
      headers: {
        'auth_key': Auth.getToken()
      },
      body: data
    }).then(function (res) {
      responseStatus = res.status
      resolve(res.json())
    }).catch(error => console.error(error))
  })
  if (message && responseStatus === 200) {
    message.receiver.newMessage = result
    commit('send_user_message', message.receiver)
  }
  if (newChat) dispatch("fetchUserMessages")
}
export async function fetchAttachment(commit, { fileName }) {
  return await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/images/user/messages/${fileName}`, {
      method: 'GET',
      headers: {
        'auth_key': Auth.getToken()
      }
    }).then(function (res) {
      resolve(res.blob())
    })
      .catch(error => console.error(error))
  })
}