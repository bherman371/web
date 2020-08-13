import Auth from '../../../modules/Auth'
import Global from '../../../constants/Global'
// import store from '../../store'

// import User from '../users/getters'
export function fetchMyPointSum({ commit }) {
  fetch(Global.getServerDomain() + `/profile/pointsum`, {
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
      commit('my_pointsum', payload.my_pointsum)
    })
    .catch(error => console.error(error))
}
export async function fetchMyPoints({ commit, getters }) {
  const result = await new Promise(resolve => {
    try {
      fetch(Global.getServerDomain() + `/profile/points`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_key': Auth.getToken()
        }
      })
        .then(function (res) {
          resolve(res.json())
        })
    } catch (error) {
      console.log(error);
    }
  })
  var myPoints = []
  var rowIndex = result.length - 1
  let bal = 0;
  result.forEach(function (element, index) {
    var item = {}
    // var date = new Date(element.createdAt)
    // const f = (date) => (date < 10 ? "0" + date : date);
    // item.Time = f(date.getMonth() + 1) + "/" + f(date.getDate()) + "/" + date.getFullYear()
    item.Time = element.createdAt
    item.Points = element.value
    item.Partner = element.sUser_to.username
    item.Partner_id = element.sUser_to.id
    if (item.Partner === getters.getUser.username) {
      if (element.sUser_from) {
        item.Partner = element.sUser_from.username
        item.Partner_id = element.sUser_from.id
      } else {
        item.Partner = 'Swampum system'
        item.Partner_id = 0
      }
    } else {
      item.Points = item.Points * -1
    }
    item.Note = element.message
    item._showDetails = false
    item.index = rowIndex
    rowIndex--
    if (item.Note && element.sUser_from) {
      item.Note = element.sUser_from.username + ': ' + item.Note
    }
    if (index === 0) {
      bal = item.Points
    } else if (index === result.length - 1 || index > 0) {
      bal += item.Points
    }
    item.Balance = bal;
    myPoints.push(item)
  })
  commit('my_points', myPoints)
  // fetch(Global.getServerDomain() + `/profile/points`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'auth_key': Auth.getToken()
  //   }
  // })
  //   .then(function (res) {
  //     return res.json()
  //   })
  //   .then(function (payload) {
  //     var myPoints = []
  //     var rowIndex = payload.length - 1
  //     payload.forEach(function (element) {
  //       var item = {}
  //       var date = new Date(element.createdAt)
  //       item.Time = formatDate(date)
  //       item.Points = element.value
  //       item.Partner = element.sUser_to.username
  //       item.Partner_id = element.sUser_to.id
  //       if (item.Partner === getters.getUser.username) {
  //         if (element.sUser_from) {
  //           item.Partner = element.sUser_from.username
  //           item.Partner_id = element.sUser_from.id
  //         } else {
  //           item.Partner = 'Swampum system'
  //           item.Partner_id = 0
  //         }
  //       } else {
  //         item.Points = item.Points * -1
  //       }
  //       item.Note = element.message
  //       item._showDetails = false
  //       item.index = rowIndex
  //       rowIndex--
  //       if (item.Note && element.sUser_from) {
  //         item.Note = element.sUser_from.username + ': ' + item.Note
  //       }
  //       myPoints.push(item)
  //     }, this)
  //     commit('my_points', myPoints)
  //   })
  //   .catch(error => console.error(error))
}

export function transferPoint({ commit, dispatch }, { partner_id, value, note }) {
  fetch(Global.getServerDomain() + `/profile/points/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth_key': Auth.getToken()
    },
    body: JSON.stringify({
      user: partner_id,
      points: value,
      note: note
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function () {
      commit('transfer_point', value)
      dispatch('fetchMyPoints')
    })
    .catch(error => console.error(error))
}

export function togglePointRow({ commit }, index) {
  commit('update_my_point', index)
  // if (state.my_points[index]._showDetails) {
  //   state.my_points[index]._showDetails = !state.my_points[index]._showDetails
  // } else {
  //   state.my_points[index]._showDetails = true
  // }
}

// function formatDate(date) {
//   var d = new Date(date)
//   var month = '' + (d.getMonth() + 1)
//   var day = '' + d.getDate()
//   var year = d.getFullYear()
//   var h = d.getHours()
//   var m = addZero(d.getMinutes())
//   var s = addZero(d.getSeconds())
//   // x.innerHTML = h + ":" + m + ":" + s;
//   if (month.length < 2) month = '0' + month
//   if (day.length < 2) day = '0' + day
//   return [year, month, day].join('-') + ' ' + h + ':' + m + ':' + s
// }

// function addZero(i) {
//   if (i < 10) {
//     i = '0' + i
//   }
//   return i
// }
