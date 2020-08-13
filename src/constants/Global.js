class Global {

  static getServerDomain () {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'https://swampum.com/api'
      case 'development':
        return 'https://swampum-test.herokuapp.com'
      case 'local':
        return 'http://localhost:3000'
    }
  }

  static getGroupPicture (id) {
    return Global.getServerDomain() + '/images/group/' + id + '.jpg'
  }

  static getUserPicture (id) {
    return Global.getServerDomain() + '/images/user/' + id + '.jpg'
  }

  static getItemPicture (id) {
    return Global.getServerDomain() + '/images/item/' + id + '.jpg'
  }

  static getUserName (user) {
    if (user.firstName) {
      return user.firstName
    } else {
      return user.username
    }
  }
}

export default Global
