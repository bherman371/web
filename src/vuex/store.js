import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import groups from './modules/groups'
import points from './modules/points'
import chat from './modules/chat'
import items from './modules/items'
import feed from './modules/feed'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    users,
    groups,
    points,
    chat,
    items,
    feed
  },
  strict: debug
})
