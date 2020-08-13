import Auth from '../../../modules/Auth.js'
import Global from '../../../constants/Global.js'
import store from '../../store'
import { reject } from 'core-js/fn/promise'

export function getAllGroups({ commit }) {
  fetch(Global.getServerDomain() + `/myinvolvedgroups`, {
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
      commit('my_involved_groups', payload)
    })
    .catch(error => console.error(error))
}

export function getMyGroups({ commit }) {
  fetch(Global.getServerDomain() + `/group`, {
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
      commit('my_groups', payload)
    })
    .catch(error => console.error(error))
}

export function fetchMyModeratedGroups({ commit }) {
  fetch(Global.getServerDomain() + `/moderatedgroup`, {
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
      commit('my_moderated_groups', payload)
    })
    .catch(error => console.error(error))
}

export function getGroupSearch({ commit }, query) {
  fetch(Global.getServerDomain() + `/group/search`, {
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
      console.log(payload)
      if (payload) {
        var searchResult = []
        var rowIndex = payload.length - 1
        payload.forEach(function (element) {
          var item = {}
          item.Group_id = element.id
          item.Privacy = element.privacy
          item.Type = element.type
          item.Title = element.name
          item.Picture = element.picture
          item.Description = element.description
          item.Zip = element.zip
          item._showDetails = false
          item.index = rowIndex
          rowIndex--
          searchResult.push(item)
        }, this)
        commit('search_groups', searchResult)
      }
    })
    .catch(error => console.error(error))
}

export function sendGroupMessage({ commit }, { group, message }) {
  fetch(Global.getServerDomain() + `/group/${group.id}/messages`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      id: group.rcGroup,
      message: message
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        payload.groupId = group.id
        payload.message.u = store.getters.getUser
        commit('add_group_message', payload)
      }
    })
    .catch(error => console.error(error))
}

export function fetchGroupMessages({ commit }, info) {
  fetch(Global.getServerDomain() + `/group/${info.groupId}/messages`, {
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
      payload.groupId = info.groupId

      commit('update_messages', payload)
    })
    .catch(error => console.error(error))
}

export async function joinGroup({ dispatch }, groupId) {
  return await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/group/${groupId}/join`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      }
    })
      .then(res => {
        resolve(res.json());
      })
      .then(function (payload) {
        if (payload) {
          dispatch('getAllGroups')
          dispatch('getMyGroups')
          dispatch('fetchMyJoinRequests')
          console.log('acabou');
        }
      })
      .catch(error => console.error(error))
  })
}

export function leaveGroup({ dispatch }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/leave`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('getAllGroups')
        dispatch('getMyGroups')
      }
    })
    .catch(error => console.error(error))
}

export function setCurrentGroup({ commit }, groupId) {
  commit('set_group', groupId)
}

export function getGroupInvitations({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/invitations`, {
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
      // commit('get_groups', payload)
      if (payload.length > 0) {
        commit('update_invitations', payload)
      }
    })
    .catch(error => console.error(error))
}

export function getGroupModeratorInvitations({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/moderatorinvitations`, {
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
        commit('group_moderator_invitations', payload)
      }
    })
    .catch(error => console.error(error))
}

export function fetchJoinRequests({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/requests`, {
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
      // if (payload.length > 0) {
      var searchResult = []
      var rowIndex = payload.length - 1
      payload.forEach(function (element) {
        var item = {}
        item.User_id = element.sUser.id
        item.Username = element.sUser.username
        item.Picture = element.sUser.picture
        item.Description = element.sUser.description
        item._showDetails = false
        item.index = rowIndex
        rowIndex--
        searchResult.push(item)
      }, this)
      commit('join_requests', searchResult)
      // }
    })
    .catch(error => console.error(error))
}

export function fetchModerator({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/moderator`, {
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
      commit('moderator', payload)
    })
    .catch(error => console.error(error))
}

export function fetchGroupProfile({ commit }, id) {
  fetch(Global.getServerDomain() + `/group/${id}`, {
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
      // if (payload) {
      commit('group_profile', payload)
      // }
    })
    .catch(error => console.error(error))
}

export function fetchModeratorInvitees({ commit }, id) {
  fetch(Global.getServerDomain() + `/group/${id}/moderatorinvite`, {
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
      if (payload) {
        var searchResult = []
        var rowIndex = payload.length - 1
        payload.forEach(function (element) {
          var item = {}
          item.User_id = element.sUser.id
          item.Username = element.sUser.username
          item.Picture = element.sUser.picture
          item.Description = element.sUser.description
          item._showDetails = false
          item.index = rowIndex
          rowIndex--
          searchResult.push(item)
        }, this)
        commit('moderator_invitees', searchResult)
      }
    })
    .catch(error => console.error(error))
}

export function fetchGroupMembers({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/members`, {
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
      if (payload) {
        var searchResult = []
        var rowIndex = payload.length - 1
        payload.forEach(function (element) {
          var item = {}
          item.User_id = element.sUser.id
          item.Username = element.sUser.username
          item.Picture = element.sUser.picture
          item.Description = element.sUser.description
          item.Situation = element.situation
          item.SUser = element.sUser
          item._showDetails = false
          item.index = rowIndex
          rowIndex--
          if (element.situation === 1 || element.situation === 2) searchResult.push(item)
        }, this)
        commit('group_members', searchResult)
      }
    })
    .catch(error => console.error(error))
}

export function assignModerator({ dispatch }, { groupId, userId }) {
  fetch(Global.getServerDomain() + `/group/${groupId}/moderatorinvite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      member: userId
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function () {
      dispatch('fetchModeratorInvitees', groupId)
      dispatch('fetchGroupMembers', groupId)
    })
    .catch(error => console.error(error))
}

export function assignModeratorCancel({ dispatch }, { groupId, userId }) {
  fetch(Global.getServerDomain() + `/group/${groupId}/moderatorinvitecancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      member: userId
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchModeratorInvitees', groupId)
        dispatch('fetchGroupMembers', groupId)
      }
    })
    .catch(error => console.error(error))
}

export function removeMember({ dispatch }, { groupId, userId }) {
  fetch(Global.getServerDomain() + `/group/${groupId}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: userId
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchGroupMembers', groupId)
        dispatch('fetchJoinRequests', groupId)
      }
    })
    .catch(error => console.error(error))
}

export function acceptMember({ dispatch }, { groupId, userId }) {
  fetch(Global.getServerDomain() + `/group/${groupId}/acceptjoinrequest`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: userId
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (payload) {
      if (payload) {
        dispatch('fetchGroupMembers', groupId)
        dispatch('fetchJoinRequests', groupId)
      }
    })
    .catch(error => console.error(error))
}

export function fetchJoinInvitations({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/invitations`, {
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
      // commit('get_groups', payload)
      // if (payload.length > 0) {
      var searchResult = []
      var rowIndex = payload.length - 1
      payload.forEach(function (element) {
        var item = {}
        item.User_id = element.sUser.id
        item.Username = element.sUser.username
        item.Picture = element.sUser.picture
        item.Description = element.sUser.description
        item._showDetails = false
        item.index = rowIndex
        rowIndex--
        searchResult.push(item)
      }, this)
      commit('join_invitations', searchResult)
      // }
    })
    .catch(error => console.error(error))
}

export async function inviteMember(dispatch, { groupId, userId }) {
  return await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/group/${groupId}/invite`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({
        friend: userId
      })
    })
      .then(res => {
        resolve(res.json())
      })
      .catch(error => reject(error));
  })

}

export function fetchGroup({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}`, {
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
      commit('fetch_group', payload)
    })
    .catch(error => console.error(error))
}

export function fetchMembers({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/members`, {
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
      commit('fetch_group_members', payload)
    })
    .catch(error => console.error(error))
}

export function fetchItems({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/items`, {
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
      commit('fetch_group_items', payload)
    })
    .catch(error => console.error(error))
}

export function fetchMessages({ commit }, groupId) {
  fetch(Global.getServerDomain() + `/group/${groupId}/messages`, {
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
      commit('fetch_group_messages', payload)
    })
    .catch(error => console.error(error))
}

export function fetchGroupsYouMayLike({ commit }) {
  fetch(Global.getServerDomain() + `/groupsyoumaylike`, {
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
      commit('fetch_group_you_may_like', payload)
    })
    .catch(error => console.error(error))
}

export function setNewGroupImage({ commit }, image) {
  commit('set_group_image', image)
}

export function setNewGroupImageOrientation({ commit }, imageOrientation) {
  commit('set_group_image_orientation', imageOrientation)
}

export function setNewGroupImageFile({ commit }, imageFile) {
  commit('set_group_image_file', imageFile)
}

export async function createNewGroup({ dispatch }, { group }) {
  let responseStatus = "";
  const groupRequest = {
    name: group.name,
    type: 1,
    privacy: group.privacy,
    description: group.description,
    freeOnly: false
  }
  const result = await new Promise((resolve, reject) => {
    fetch(Global.getServerDomain() + '/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify(groupRequest)
    }).then(res => {
      responseStatus = res.status;
      resolve(res.json())
    }).catch(error => {
      reject(error);
    })
  });
  if (responseStatus === 200) {
    group.members.forEach(element => {
      dispatch('inviteMember', { groupId: result.group.id, userId: element.id });
    });
    await dispatch('saveGroupImage', { groupId: result.group.id, groupImg: group.image_file });
  }
  return result;
}

export function setNewGroupDescription({ commit }, description) {
  commit('set_new_group_description', description)
}

export function setNewGroupTitle({ commit }, title) {
  commit('set_new_group_title', title)
}

export function setNewGroupPrivacy({ commit }, privacy) {
  commit('set_new_group_privacy', privacy)
}

export function setNewGroupMembers({ commit }, members) {
  commit('set_new_group_members', members)
}

export async function saveGroupImage(commit, { groupId, groupImg }) {
  let data = new FormData();
  data.append("image", groupImg.imageFile);
  let result = null;
  try {
    result = await new Promise((reject, resolve) => {
      fetch(Global.getServerDomain() + `/images/group/${groupId}`, {
        method: 'POST',
        headers: {
          'auth_key': Auth.getToken()
        },
        body: data
      }).then(res => {
        resolve(res.json());
      }).catch(error => {
        reject(error);
      })
    })
  } catch (error) {
    console.log(error);
  }
  return result;
}

export function resetNewGroup({ commit }) {
  commit('reset_new_group');
}