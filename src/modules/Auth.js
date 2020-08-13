class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser (token, createdAt) {
    localStorage.setItem('token', token)
    localStorage.setItem('createdAt', createdAt)
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated () {
    return localStorage.getItem('token') !== null
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser () {
    localStorage.removeItem('token')
    localStorage.removeItem('createdAt')
  }
  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken () {
    return localStorage.getItem('token')
  }

  static getTime () {
    return localStorage.getItem('createdAt')
  }

  static getNowTime () {
    return new Date()
  }

  static getOpenTime () {
    return this.getNowTime().getTime() - new Date(this.getTime()).getTime()
  }

}

export default Auth
