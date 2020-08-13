// import store from '../vuex/store'
class Chat {

  constructor () {
    this.participants = []
    this.messageList = []
    this.newMessageCount = 0
    this.isChatOpen = false
    this.showingTypingIndicator = ''
    this.alwaysScrollToBottom = false
    this.titleImageUrl = ''
    this.id = ''
    this.partner = {}
  }

  // getPartner = function (currentUser) {
  //   for (let i = 0; i < this.participants.length; i++) {
  //     if (currentUser.username !== this.participants[i].name) {
  //       return this.participants[i]
  //     }
  //   }
  // }

  // onMessageWasSent = function (newMessage) {
  //   // called when the user sends a message
  //   let roomId = this.$parent.$parent.$attrs.roomId
  //   let partnerId = this.$parent.$parent.$attrs.partnerId

  //   let message = {
  //     partnerId: partnerId,
  //     room: roomId,
  //     newMessage: newMessage.data.text
  //   }

  //   store.dispatch('sendMessage', message)
  // }

  // openChat = function () {
  //   // called when the user clicks on the fab button to open the chat
  //   this.isChatOpen = true
  //   this.newMessagesCount = 0
  // }

  // closeChat = function () {
  //   // called when the user clicks on the botton to close the chat
  //   console.log(this)
  //   let roomId = this.$parent.$parent.$attrs.roomId
  //   store.dispatch('closeChat', roomId)
  // }
}

export default Chat
