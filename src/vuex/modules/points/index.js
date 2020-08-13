import * as getters from './getters'
import * as actions from './actions'

const MY_POINTS = 'my_points'
const MY_POINTSUM = 'my_pointsum'
const TRANSFER_POINT = 'transfer_point'
const UPDATE_MY_POINT = 'update_my_point'
const initialState = {
  my_points: [],
  my_pointsum: null
}

const mutations = {
  [MY_POINTS] (state, payload) {
    state.my_points = payload
  },
  [MY_POINTSUM] (state, payload) {
    state.my_pointsum = payload
  },
  [TRANSFER_POINT] (state, payload) {
    state.my_pointsum -= payload
  },
  [UPDATE_MY_POINT] (state, index) {
    var rowIndexMyPoint = findRowIndexOfMyPoint(state.my_points, index)
    for (var i = 0; i < state.my_points.length; i++) {
      if (i === rowIndexMyPoint) {
        if (state.my_points[rowIndexMyPoint]._showDetails) {
          state.my_points[rowIndexMyPoint]._showDetails = !state.my_points[rowIndexMyPoint]._showDetails
        } else {
          state.my_points[rowIndexMyPoint]._showDetails = true
        }
      } else {
        state.my_points[i]._showDetails = false
      }
    }
  }
}

function findRowIndexOfMyPoint (points, index) {
  for (var i = 0; i < points.length; i++) {
    if (points[i].index === index) return i
  }
}

export default {
  state: {...initialState},
  actions,
  getters,
  mutations
}
