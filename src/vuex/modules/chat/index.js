import * as getters from './getters'
import * as actions from './actions'
import Vue from 'vue'

const OPEN_USER_CHAT = 'open_user_chat'
const NEW_USER_CHAT = 'new_user_chat'
const SET_USER_MESSAGES = 'set_user_messages'
const SEND_USER_MESSAGE = 'send_user_message'
const SET_MODERATOR_MESSAGES_MEMBER = 'set_moderator_messages_member'
const SET_MODERATOR_MESSAGES_MODERATOR = 'set_moderator_messages_moderator'
const SEND_MODERATOR_MESSAGE_MEMBER = 'send_moderator_message_member'
const SEND_MODERATOR_MESSAGE_MODERATOR = 'send_moderator_message_moderator'
const OPEN_MODERATOR_CHAT = 'open_moderator_chat'
const NEW_MODERATOR_CHAT = 'new_moderator_chat'
const CLOSE_USER_CHAT = 'close_user_chat'
const CLOSE_MODERATOR_CHAT = 'close_moderator_chat'
const SET_NEW_MESSAGE_COUNTER = "set_new_message_counter"
const SET_WINDOW_CHAT_STATE = "set_window_chat_state"


const initialState = {
  userMessages: [],
  moderatorMessagesAsMember: [],
  moderatorMessagesAsModerator: [],
  openChats: [],
  newMessagesCounter: 0,
  windowChatState: false,
  windowChatMsgs: {}
}

const mutations = {
  [SET_USER_MESSAGES](state, messages) {
    state.userMessages = messages
    for (let i = 0; i < state.openChats.length; i++) {
      if (!state.openChats[i].name) {
        for (let j = 0; j < state.userMessages.length; j++) {
          if (state.openChats[i].id === state.userMessages[j].id) {
            Vue.set(state.openChats, i, state.userMessages[j])
            break
          }
        }
      }
    }
  },

  [SET_MODERATOR_MESSAGES_MEMBER](state, messages) {
    state.moderatorMessagesAsMember = messages
    for (let i = 0; i < state.openChats.length; i++) {
      if (state.openChats[i].name) {
        for (let j = 0; j < state.moderatorMessagesAsMember.length; j++) {
          if (state.openChats[i].id === state.moderatorMessagesAsMember[j].id) {
            Vue.set(state.openChats, i, state.moderatorMessagesAsMember[j])
            break
          }
        }
      }
    }
  },

  [SET_MODERATOR_MESSAGES_MODERATOR](state, messages) {
    state.moderatorMessagesAsModerator = messages
  },

  [OPEN_USER_CHAT](state, user) {
    for (let i = 0; i < state.userMessages.length; i++) {
      if (state.userMessages[i].id === user.id) {
        state.openChats.push(state.userMessages[i])
        return
      }
    }
  },

  [OPEN_MODERATOR_CHAT](state, group) {
    for (let i = 0; i < state.moderatorMessagesAsMember.length; i++) {
      if (state.moderatorMessagesAsMember[i].id === group.id) {
        state.openChats.push(state.moderatorMessagesAsMember[i])
        return
      }
    }
  },

  [NEW_USER_CHAT](state, user) {
    user.messages = []
    state.openChats.push(user)
    state.userMessages.push(user)
  },

  [NEW_MODERATOR_CHAT](state, group) {
    group.messages = []
    state.moderatorMessagesAsMember.push(group)
    state.openChats.push(group)
  },

  [SEND_USER_MESSAGE](state, m) {
    for (let i = 0; i < state.userMessages.length; i++) {
      if (m.newMessage.receiverId === state.userMessages[i].id) {
        // state.userMessages[i].messages.push(m.newMessage)
        console.log(m)
        Vue.set(state.userMessages[i].messages, state.userMessages[i].messages.length, m.newMessage);
        return
      }
    }
    for (let i = 0; i < state.openChats.length; i++) {
      if (m.id === state.openChats[i].id && state.openChats[i].freeOnly === undefined) {
        state.openChats[i].messages.push(m.newMessage)
        return
      }
    }
  },

  [SEND_MODERATOR_MESSAGE_MEMBER](state, m) {
    for (let i = 0; i < state.moderatorMessagesAsMember.length; i++) {
      if (m.id === state.moderatorMessagesAsMember[i].id) {
        state.moderatorMessagesAsMember[i].messages.push(m.newMessage)
        break
      }
    }
    for (let i = 0; i < state.openChats.length; i++) {
      if (m.id === state.openChats[i].id && state.openChats[i].freeOnly !== undefined) {
        state.openChats[i].messages.push(m.newMessage)
        console.log('DONE')
        return
      }
    }
  },

  [SEND_MODERATOR_MESSAGE_MODERATOR](state, m) {
    for (let i = 0; i < state.moderatorMessagesAsModerator.length; i++) {
      if (m.id === state.moderatorMessagesAsModerator[i].id) {
        state.moderatorMessagesAsModerator[i].messages.push(m.newMessage)
        return
      }
    }
  },

  [CLOSE_USER_CHAT](state, user) {
    for (let i = 0; i < state.openChats.length; i++) {
      if (state.openChats[i].id === user.id && state.openChats[i].freeOnly === undefined) {
        state.openChats.splice(i, 1)
        break
      }
    }
  },

  [CLOSE_MODERATOR_CHAT](state, group) {
    for (let i = 0; i < state.openChats.length; i++) {
      if (state.openChats[i].id === group.id && state.openChats[i].freeOnly !== undefined) {
        state.openChats.splice(i, 1)
        return
      }
    }
  },
  [SET_NEW_MESSAGE_COUNTER](state, amount) {
    state.newMessagesCounter += amount;
  },
  [SET_WINDOW_CHAT_STATE](state, { value, msgs }) {
    state.windowChatState = value;
    state.windowChatMsgs = msgs
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
