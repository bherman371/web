import Auth from './Auth'
import Global from '../constants/Global'

class Login {
  static loginFetching (input) {
    if (this.checkIfEntryIsValid(input)) {
      return this.fetchLoginAPI()
    } else {
      this.displayErrorPopup('The entry is no valid')
    }
  }

  static checkIfEntryIsValid (entry) {
    if (entry.username && entry.password) {
      return true
    } else {
      return false
    }
  }

  displayErrorPopup (msg) {
    self.errors.add('login_form', msg, 'no_cred')
    setTimeout(function () {
      self.errors.clear()
    }, 5000)
  }

  static fetchLoginAPI () {
    console.log("here")
    fetch(Global.getServerDomain() + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.credentials.username,
        password: this.credentials.password
      })
    })
    .then(function (res) {
      return res.json()
    }).catch(error => console.error('Error: ', error))
  }

  static checkIfLoginFetchingSuccess (result) {
    if (this.loginFetching().token) {
      this.loginSuccess(result)
    } else {
      this.loginFalse()
    }
  }

  loginSuccess (status) {
    Auth.authenticateUser(status.token, status.createdAt, status.sUserId)
    localStorage.setItem('user_id', status.sUserId)
  }

  loginFalse (result) {
    var status = result
    let errorMsg = status.result ? status.result : status.error
    if (status.error === 'User have not been confirmed.') {
      self.errors.add('login_form', errorMsg)
      self.$root.$emit('bv::show::modal', 'modal--resent')
      localStorage.setItem('cred-word', self.credentials.password)
      localStorage.setItem('cred-name', self.credentials.username)
      self.credentials.password = ''
      self.credentials.username = ''
    } else {
      self.errors.add('login_form', 'Please enter a valid username and password.')
    }
  }
}

export default Login
