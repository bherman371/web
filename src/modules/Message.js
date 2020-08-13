import Data from '@/modules/Data.js'

class Message {

  constructor () {
    this.type = ''
    this.name = ''
    this.author = ''
    this.data = new Data()
    this.createdAt = new Date()
  }

}

export default Message
