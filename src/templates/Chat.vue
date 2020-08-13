<template>
  <beautiful-chat
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen"
    :open="openChat"
    :close="closingChat"
    :showEmoji="false"
    :showFile="false"
    :showTypingIndicator="showTypingIndicator"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :id="id" />
</template>

<script>
import Global from '@/constants/Global'
import Auth from '@/modules/Auth.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  props: ['chat'],
  data () {
    return {
      id: 0,
      colors: {
        header: {
          bg: '#67BAB9',
          text: '#ffffff'
        },
        launcher: {
          bg: '#67BAB9'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#67BAB9',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      },
      participants: [],
      titleImageUrl: null,
      newMessagesCount: 0,
      isChatOpen: true,
      showTypingIndicator: '',
      alwaysScrollToBottom: false,
      messageStyling: true,
      messageList: []
    }
  },
  methods: {
    ...mapActions([
      'closeUserChat',
      'closeModeratorChat',
      'postUserMessage',
      'postModeratorMessageAsMember'
    ]),
    closingChat () {
      if (this.chat.freeOnly !== undefined) {
        this.closeModeratorChat(this.chat)
      } else {
        this.closeUserChat(this.chat)
      }
    },
    getName (user) {
      if (user.moderator !== undefined) {
        return `<a style='color: white;' href='#/user/${user.moderator.id}'>${Global.getUserName(user.moderator)} (moderator)</a> <br> <a style='color: white;' href='#/grouppage/${user.id}'>${user.name}</a>`
      } else {
        return `<a style='color: white;' href='#/user/${user.id}'>${Global.getUserName(user)}</a>`
      }
    },
    onMessageWasSent (message) {
      if (this.chat.freeOnly === undefined) {
        message.receiver = this.chat
        this.postUserMessage(message)
      } else {
        message.group = this.chat
        this.postModeratorMessageAsMember(message)
      }
      this.messageList = [...this.messageList, message]
    },
    openChat () {

    },
    updateChat (newChat) {
      this.participants = [
        {
          id: newChat.id,
          name: this.getName(newChat),
          imageUrl: newChat.picture
        }
      ]
      this.messageList = []
      for (let i = 0; i < newChat.messages.length; i++) {
        let msg = {
          type: 'text',
          author: (newChat.messages[i].senderId === newChat.id ? newChat.id : 'me'),
          data: {
            text: newChat.messages[i].msg
          }
        }
        this.messageList.push(msg)
      }
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  watch: {
    chat (value) {
      console.log('Chat Changed')
      this.updateChat(value)
    }
  },
  created: function () {
    this.updateChat(this.chat)
    this.id = Math.floor(Math.random() * 10000)
    if (this.chat.name && !this.chat.moderator) {
      fetch(Global.getServerDomain() + `/group/${this.chat.id}/moderator`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_key': Auth.getToken()
        }
      })
      .then(function (res) {
        return res.json()
      })
      .then((payload) => {
        this.chat.moderator = payload
        let chat = document.querySelector('div[id=\'' + this.id + '\']')
        let chatboxName = chat.querySelector('.sc-header--title')
        chatboxName.innerHTML = this.getName(this.chat)
        this.updateChat(this.chat)
      })
      .catch(error => console.error(error))
    }
  },
  mounted () {
    const self = this
    let chat = document.querySelector('div[id=\'' + this.id + '\']')
    let chatboxName = chat.querySelector('.sc-header--title')
    chatboxName.innerHTML = this.getName(this.chat)
    let oldElement = chatboxName
    let newElement = oldElement.cloneNode(true)
    oldElement.parentNode.replaceChild(newElement, oldElement)

    let chatboxExit = chat.querySelector('.sc-header--close-button')
    chatboxExit.addEventListener('click', function () {
      self.closingChat()
    })
  },
  beforeDestroy () {
    this.closeUserChat(this.chat)
    this.closeModeratorChat(this.chat)
  }
}
</script>
<style scoped>
a .link {
  color: white !important;
}

a .link:hover {
  text-decoration: underline !important;
}
</style>

