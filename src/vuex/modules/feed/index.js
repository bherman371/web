import * as getters from './getters'
import * as actions from './actions'


const NEWSFEED = 'feed';

const initialState = {
  feed: []
}

const mutations = {
  [NEWSFEED] (state, feed) {
    state.feed = feed
  }
}

export default {
  state: {...initialState},
  actions,
  getters,
  mutations
}
