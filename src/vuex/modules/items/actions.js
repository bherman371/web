import Auth from '../../../modules/Auth'
import Global from '../../../constants/Global'


export function setImage({ commit }, { image }) {
  commit('set_item_image', image)
}

export function getItemSearch({ commit }, query) {
  fetch(Global.getServerDomain() + `/item/search`, {
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
          // console.log(element)
          var item = {}
          item.Item_id = element.id
          item.Title = element.title
          item.Picture = element.picture
          item.Description = element.description
          item.Type = element.type
          item.Category = element.category
          item.Condition = element.condition
          item.Cash = element.cash
          item.Points = element.points
          item._showDetails = false
          item.index = rowIndex
          rowIndex--
          searchResult.push(item)
        }, this)
        commit('search_items', searchResult)
        // commit('search_items', {
        //   results: payload,
        //   query: query
        // })
      }
    })
    .catch(error => console.error(error))
}

export function setImageOrientation({ commit }, imageOrientation) {
  commit('set_item_image_orientation', imageOrientation)
}

export function setImageFile({ commit }, { imageFile }) {
  commit('set_image_file', imageFile)
}

export function setNewItemTitle({ commit }, input) {
  commit('set_item_title', input)
}

export function setNewItemDescription({ commit }, input) {
  commit('set_item_description', input)
}

export function setNewItemType({ commit }, input) {
  commit('set_item_type', input)
}

export function setNewItemPaymentType({ commit }, input) {
  commit('set_item_payment_type', input)
}

export function setNewItemPaymentValues({ commit }, { input }) {
  commit('set_item_payment_values', input)
}

export function setNewItemCategory({ commit }, input) {
  commit('set_item_category', input)
}

export function setNewItemCondition({ commit }, input) {
  commit('set_item_condition', input)
}

export function fetchItemProfile({ commit }, id) {
  fetch(Global.getServerDomain() + `/item/${id}`, {
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
      commit('item_profile', payload)
    })
    .catch(error => console.error(error))
}

export async function postItem({ commit, dispatch }, input) {
  var fetchUrl = Global.getServerDomain() + '/item'
  var fetchType = 'POST'
  var bodyInput = input
  let responseStatus = "";
  let result = await new Promise((resolve) => {
    fetch(fetchUrl, {
      method: fetchType,
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify(bodyInput)
    })
      .then(function (res) {
        responseStatus = res.status;
        resolve(res.json())
      })
      .catch(error => console.error('Error: ', error))
  })
  commit('post_item_response', result);
  if (responseStatus === 200) dispatch('postItemImage', { itemId: result.itemId, imageFile: input.image_file })
}

export function resetNewItem({ commit }) {
  commit('reset_new_item')
}

export function prepareUpdatedItem({ commit }, update) {
  commit('updated_item', update)
}

export function updateItem({ commit, state }, itemId) {
  fetch(Global.getServerDomain() + `/item/` + itemId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify(state.updated_item)
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (itemInfo) {
      commit('update_item', itemInfo)
    })
    .catch(error => console.error(error))
}

export function fetchUserInventory({ commit }, query) {
  fetch(Global.getServerDomain() + `/profile/${query}/inventory`, {
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
          item.id = element.id
          item.Item_id = element.id
          item.Title = element.title
          item.Picture = element.picture
          item.Description = element.description
          item.Type = element.type
          item.Category = element.category
          item.Condition = element.condition
          item.Cash = element.cash
          item.CreatedAt = element.createdAt
          item.Points = element.points
          item._showDetails = false
          item.isRequested = [undefined, undefined]
          item.countInterested = item.isRequested.length
          item.index = rowIndex
          rowIndex--
          searchResult.push(item)
        }, this)
        commit('user_inventory', searchResult)
      }
    })
    .catch(error => console.error(error))
}

export async function searchAPI({ commit }, { query }) {
  commit("search_query", query);
  commit("clear_search");
  const result = await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/search?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        resolve(res.json())
      })
      .catch(error => console.error(error))
  });
  commit("search_result", { result: result, query: query })
}

export async function searchAutocompleteAPI({ commit }, { query }) {
  const result = await new Promise((resolve) => {
    fetch(Global.getServerDomain() + `/search?query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        resolve(res.json())
      })
      .catch(error => console.error(error))
  });
  commit("search_autocomplete", { result: result })
}

export async function fetchItemMessages({ commit }, id) {
  fetch(Global.getServerDomain() + `/messages/item/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    }
  }).then(res => {
    return res.json()
  }).then(payload => {
    commit("item_messages", payload);
  }).catch(error => console.error(error))
}

export async function postItemMessage({ commit }, { id, text, user }) {
  fetch(Global.getServerDomain() + `/messages/item/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      msg: text
    })
  }).then(res => {
    return res.json()
  }).then(payload => {
    payload.sender = user;
    commit("item_post_messages", payload);
  }).catch(error => console.error(error))
}

export async function postItemImage(commit, { itemId, imageFile }) {
  let data = new FormData();
  data.append("image", imageFile);
  return await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/images/item/${itemId}`, {
      method: "POST",
      headers: {
        'auth_key': Auth.getToken()
      },
      body: data
    }).then(res => {
      resolve(res.json())
    }).catch(error => console.error(error))
  })
}

export async function makeItemRequest({ commit }, { id, itemId, userId }) {
  const result = await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/request/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({
        item: { id: itemId },
        user: { id: userId }
      })
    }).then(res => {
      resolve(res.json())
    }).catch(error => console.error(error))
  })
  commit("post_item_response", result);
}

export async function acceptItemRequest({ dispatch }, { request }) {
  let responseStatus = "";
  await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/request/accept/${request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({ request: request })
    }).then(res => {
      responseStatus = res.status;
      resolve(res.json())
    }).catch(error => console.error(error))
  })
  if (responseStatus === 200) {
    dispatch('fetchItemRequestReceived')
  }
}

export async function declineItemRequest({ dispatch }, { request }) {
  let responseStatus = ""
  await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/request/reject/${request.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      },
      body: JSON.stringify({ request })
    }).then(res => {
      responseStatus = res.status;
      resolve(res.json())
    }).catch(error => console.error(error))
  })
  if (responseStatus === 200) {
    dispatch('fetchItemRequestReceived')
  }
}

export async function fetchItemRequestMade({ commit }) {
  const result = await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/request/made`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      }
    })
      .then(res => {
        resolve(res.json());
      }).catch(error => console.log("Error: ", error))
  });
  commit('set_item_requests_made', result);
}

export async function fetchItemRequestReceived({ commit }) {
  const result = await new Promise(resolve => {
    fetch(Global.getServerDomain() + `/request/received`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth_key': Auth.getToken()
      }
    })
      .then(res => {
        resolve(res.json());
      }).catch(error => console.log("Error: ", error))
  });
  commit('set_item_requests_received', result);
}