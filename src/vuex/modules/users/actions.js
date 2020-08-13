import Auth from '../../../modules/Auth'
import Global from '../../../constants/Global.js'

export function checkEmail(email) {
  return new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/emailAvailability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(function (res) {
        resolve(res.json())
      })
      .catch(error => console.error('Error: ', error))
  })
}

export function checkUsernameAvailability(username) {
  return new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/usernameAvailability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(function (res) {
        resolve(res.json())
      })
      .catch(error => console.error('Error: ', error))
  })
}

export function checkUsernameActivated(username) {
  return new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/checkUsernameActivated`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(function (res) {
        resolve(res.json())
      })
      .catch(error => console.error('Error: ', error))
  })
}

export function checkEmailActivated(email) {
  return new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/checkEmailActivated`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(function (res) {
        resolve(res.json())
      })
      .catch(error => console.error('Error: ', error))
  })
}

export async function signup({ commit }, input) {
  var fetchUrl = Global.getServerDomain() + '/signup'
  var fetchType = 'POST'
  var bodyInput = {
    username: input.username,
    email: input.email,
    password: input.password
  }

  return await new Promise(() => {
    fetch(fetchUrl, {
      method: fetchType,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyInput)
    })
      .then(function (res) {
        if (res.status === 200) {
          commit("register_success");
        }
        return res.json()
      }).then(function (payload) {
        commit("registration_response", payload);
      })
      .catch(error => console.error('Error: ', error))
  })
}

export async function startSession({ commit, dispatch }) {
  return await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      }
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (userInfo) {
        commit('start_session', userInfo)
        resolve();
        dispatch("fetchUserInventory", userInfo.id)
      })
      .catch(error => console.error(error))
  });
}

export async function endSession({ commit }) {
  fetch(Global.getServerDomain() + `/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function () {
      commit('end_session')
    })
    .catch(error => console.error(error))
}

export async function fetchMySession({ commit }) {
  fetch(Global.getServerDomain() + `/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      commit('my_session', payload)
    })
    .catch(error => console.error(error))
}

export function refreshUser({ commit }) {
  fetch(Global.getServerDomain() + `/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (userInfo) {
      commit('refresh_user', userInfo)
    })
    .catch(error => console.error(error))
}

export function prepareUpdatedUser({ commit }, update) {
  commit('updated_user', update)
}

export function updateUser({ commit, state }) {
  fetch(Global.getServerDomain() + `/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify(state.updated_user)
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (userInfo) {
      commit('update_user', userInfo)
    })
    .catch(error => console.error(error))
}

export function fetchUserProfile({ commit }, userId) {
  fetch(Global.getServerDomain() + `/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      commit('user_profile', payload)
    })
    .catch(error => console.error(error))
}

export function changePassword({ commit, state }, update, token) {
  if (!token) token = Auth.getToken()

  fetch(Global.getServerDomain() + `/changePassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': token
    },
    body: JSON.stringify(update)
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (userInfo) {
      if (userInfo.error) state.error = userInfo.error
      commit('change_password', userInfo)
    })
    .catch(error => console.error(error))
}

export function getMyMessages({ commit }) {
  fetch(Global.getServerDomain() + `/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload.length > 0) {
        commit('update_threads', payload)
      }
    })
    .catch(error => console.error(error))
}

export function getMyInvitations({ commit }) {
  fetch(Global.getServerDomain() + `/invitations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload.length > 0) {
        commit('my_invitations', payload)

      }
    })
    .catch(error => console.error(error))
}

export async function fetchMyInvitations({ commit }) {
  const result = fetch(Global.getServerDomain() + `/invitations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      // var fetchResult = []
      // var rowIndex = payload.length - 1
      // payload.forEach(function (element) {
      //   var item = {}
      //   item.Group_id = element.groupId
      //   item.Title = element.group.name
      //   item.Picture = element.group.picture
      //   item.Description = element.group.description
      //   item.Group = element.group
      //   item.createdAt = element.createdAt
      //   item._showDetails = false
      //   item.index = rowIndex
      //   rowIndex--
      //   fetchResult.push(item)
      // }, this)
      commit('my_invitations', payload)
    })
    .catch(error => console.error(error))
  return result;
}

export function getUserSearch({ commit }, query) {
  fetch(Global.getServerDomain() + `/profile/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      query: query
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        var searchResult = []
        var rowIndex = payload.length - 1
        payload.forEach(function (element) {
          var item = {}
          item.SUer = element
          item.User_id = element.id
          item.Username = element.username
          item.Picture = element.picture
          item.Description = element.description
          item.Zip = element.zip
          item._showDetails = false
          item.index = rowIndex
          rowIndex--
          searchResult.push(item)
        }, this)
        commit('search_users', searchResult)
        // commit('search_users', {
        //   results: payload,
        //   query: query
        // })
      }
    })
    .catch(error => console.error(error))
}

export async function fetchMyJoinRequests({ commit }) {
  const result = fetch(Global.getServerDomain() + `/joinrequests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      // var fetchResult = []
      // var rowIndex = payload.length - 1
      // payload.forEach(function (element) {
      //   var item = {}
      //   item.Group_id = element.groupId
      //   item.Title = element.group.name
      //   item.Picture = element.group.picture
      //   item.createdAt = element.createdAt
      //   item.Description = element.group.description
      //   item.Group = element.group
      //   item._showDetails = false
      //   item.index = rowIndex
      //   rowIndex--
      //   fetchResult.push(item)
      // }, this)
      commit('my_join_requests', payload)
    })
    .catch(error => console.error(error))
  return result;
}

export async function acceptJoinInvitation({ state, dispatch }, groupId) {
  return await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/group/${groupId}/acceptjoininvitation`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({
        user: state.session_user.id
      })
    })
      .then(function (res) {
        resolve(res.json())
      })
      .then(function () {
        dispatch('mergeRequests')
        dispatch('getAllGroups')
      })
      .catch(error => console.error(error))
  })
}

export function declineJoinInvitation({ state, dispatch }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/declinejoininvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: state.session_user.id
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchMyInvitations')
      }
    })
    .catch(error => console.error(error))
}

export function cancelJoinRequest({ state, dispatch }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/canceljoinrequest`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: state.session_user.id
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchMyJoinRequests')
        dispatch('getAllGroups')
      }
    })
    .catch(error => console.error(error))
}

export async function fetchModeratorInvitationsData({ commit }) {
  const result = fetch(Global.getServerDomain() + `/moderatorinvitations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      // var fetchResult = []
      // var rowIndex = payload.length - 1
      // payload.forEach(function (element) {
      //   var item = {}
      //   item.Group_id = element.groupId
      //   item.Title = element.group.name
      //   item.Picture = element.group.picture
      //   item.Description = element.group.description
      //   item.Group = element.group
      //   item.createdAt = element.createdAt
      //   item._showDetails = false
      //   item.index = rowIndex
      //   rowIndex--
      //   fetchResult.push(item)
      // }, this)
      commit('my_moderator_invitations', payload)
    })
    .catch(error => console.error(error))
  return result;
}

export function acceptModeratorInvitation({ state, dispatch }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/acceptmoderatorinvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: state.session_user.id
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchModeratorInvitationsData')
        dispatch('getAllGroups')
      }
    })
    .catch(error => console.error(error))
}

export function rejectModeratorInvitation({ state, dispatch }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/rejectmoderatorinvitation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: state.session_user.id
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchModeratorInvitationsData')
        dispatch('getAllGroups')
      }
    })
    .catch(error => console.error(error))
}

export async function sendSupportRequest({ getters, state, commit }, { message, user }) {

  commit("set_request_response", "SENDING");
  let userToSend;
  if (getters.isUserAuthenticated) {
    userToSend = { ...state.session_user, ...user };
  } else {
    userToSend = user;
  }

  fetch(Global.getServerDomain() + `/sendSupportRequest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: userToSend,
      message: message
    })
  })
    .then(function (res) {
      if (res.status === 200) commit("set_request_response", "SENT");
      else commit("set_request_response", "ERROR");
      return res.json()
    })
    .then(function (payload) {
      return payload;
    })
    .catch(error => console.error(error))
}

export function sendSupport(support) {
  fetch(Global.getServerDomain() + `/sendSupport`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(support)
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      return payload;
    })
    .catch(error => console.error(error))
}

export function fetchMyNotifications({ commit }) {
  fetch(Global.getServerDomain() + `/notification`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      commit('my_notifications', payload)
    })
    .catch(error => console.error(error))
}

export async function passwordForgot({ commit }, username) {
  console.log(username)
  try {
    const result = fetch(Global.getServerDomain() + '/passwordForgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (response) {
        commit('password_forgot', response);
        if (!response.error) {
          commit('password_forgot', response);
        } else if (response.error === 'User already authenticated.') {
          commit('password_forgot', response.error);
        }
      })
    return result;
  } catch (error) {
    console.log(error)
  }

}
export function resetResponse({ commit }) {
  commit('reset_response');
}

export async function fetchProfileItems({ commit }, userId) {
  const result = await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/profile/${userId}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      }
    })
      .then(function (res) {
        resolve(res.json());
      })
      .catch(error => console.error(error))
  })
  commit('profile_items', result)

}

export function fetchProfileGroups({ commit }, userId) {
  fetch(Global.getServerDomain() + `/profile/${userId}/groups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      commit('profile_groups', payload)
    })
    .catch(error => console.error(error))
}

export async function forgotUsername({ commit }, email) {
  try {
    const result = fetch(Global.getServerDomain() + "/usernameForgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // username: this.credentials.username,
        email: email
        // password: this.credentials.password
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {
        if (!response.error) {
          commit('password_forgot', response);
        } else {
          commit('password_forgot', response);
          if (response.error === "Invalid email.") {
            commit('password_forgot', response);
          }
        }
      });
    return result;
  } catch (error) {
    commit('password_forgot', error);
    console.log(error)
  }
}

export async function mergeRequests({ commit, dispatch, rootGetters }) {
  await dispatch('fetchMyInvitations')
  await dispatch('fetchMyJoinRequests')
  await dispatch('fetchModeratorInvitationsData')
  const myInvitations = rootGetters.getMyInvitations;
  const myJoinRequests = rootGetters.getMyJoinRequests;
  const myModeratorInvitations = rootGetters.getMyModeratorInvitations;
  let invitations = myInvitations.map(item => {
    if (item) {
      return {
        ...item,
        type: "myInvitations"
      }
    } else {
      return []
    }
  })

  let joinRequests = myJoinRequests.map(item => {
    if (item) {
      return {
        ...item,
        type: "myJoinRequests"
      }
    } else {
      return []
    }
  })

  let moderatorInvitations = myModeratorInvitations.map(item => {
    if (item) {
      return {
        ...item,
        type: "myModeratorInvitations"
      }
    } else {
      return []
    }
  })
  let arr = [
    ...invitations,
    ...joinRequests,
    ...moderatorInvitations
  ];
  arr.sort((a, b) => {
    if (a.createdAt == null) {
      return 1;
    }
    if (b.createdAt == null) {
      return -1;
    }
    return b.createdAt > a.createdAt;
  });
  commit("set_all_invitations_requests", arr);

}

export async function uploadHeaderPhoto({ commit }, { photo, id }) {
  var url = Global.getServerDomain() + '/images/user/header/' + id;
  var fetchType = 'POST';
  var bodyInput = photo;
  const options = {
    method: fetchType,
    headers: {
      'auth_key': Auth.getToken()
    },
    body: bodyInput,
  };
  return await new Promise((resolve) => {
    fetch(url, options).then(function (res) {
      resolve(res.json())
      if (res.status === 200) {
        commit("header_photo", photo);
      }
    }).catch(error => console.error('Error: ', error))
  });
}

export async function updateProfilePhoto(commit, { photo, id }) {
  var url = Global.getServerDomain() + '/images/user/' + id;
  var fetchType = 'POST';
  var bodyInput = photo;
  const options = {
    method: fetchType,
    headers: {
      'auth_key': Auth.getToken()
    },
    body: bodyInput,
  };
  return await new Promise((resolve) => {
    fetch(url, options).then(function (res) {
      resolve(res.json())
    }).catch(error => console.error('Error: ', error))
  });
}

export async function emailUpdate({ commit }, email) {
  const result = await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/emailChangeRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(res => {
        resolve(res.json());
      }).catch(error => console.log("Error: ", error))
  });
  commit('set_request_response', result);
}

export async function deactivation(commit, userId) {
  const result = await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/deactivation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({
        id: userId
      })
    })
      .then(res => {
        resolve(res.json());
      })
      .catch(error => {
        console.log("Error: ", error)
      })
  });
  return result;
}
