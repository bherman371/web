import * as getters from './getters'
import * as actions from './actions'
// import * as groupActions from '../groups/actions'
import Auth from '@/modules/Auth'
import Vue from 'vue'
import uniqid from 'uniqid'

const START_SESSION = 'start_session'
const END_SESSION = 'end_session'
const UPDATE_USER = 'update_user'
const REFRESH_USER = 'refresh_user'
const USER_PROFILE = 'user_profile'
const CHANGE_PASSWORD = 'change_password'
const UPDATE_THREADS = 'update_threads'
const MY_INVITATIONS = 'my_invitations'
const SEARCH_USERS = 'search_users'
const MY_JOIN_REQUESTS = 'my_join_requests'
const MY_MODERATOR_INVITATIONS = 'my_moderator_invitations'
const MY_SESSION = 'my_session'
const UPDATED_USER = 'updated_user'
const MY_NOTIFICATION = 'my_notifications'
const REGISTER_SUCCESS = "register_success"
const REGISTRATION_RESPONSE = "registration_response"
const PROFILE_ITEMS = "profile_items"
const PROFILE_GROUPS = "profile_groups"
const PASSWORD_FORGOT = "password_forgot"
const RESET_RESPONSE = "reset_response"
const SET_ALL_INVITATIONS_REQUESTS = "set_all_invitations_requests"
const HEADER_PHOTO = "header_photo";
const SET_REQUEST_RESPONSE = "set_request_response";

const initialState = {
  // session_user: Auth.isUserAuthenticated() ? getAuthUser() : {},
  session_user: {},
  is_authenticated: Auth.isUserAuthenticated(),
  user_profile: {},
  user_threads: {},
  user_invitations: {},
  search_results: [],
  search_query: null,
  my_join_requests: {},
  my_invitations: {},
  my_moderator_invitations: {},
  my_session: {},
  updated_user: {},
  my_notifications: 0,
  registered: false,
  registration_response: {},
  profile_items: [],
  profile_groups: [],
  profile_timeline: [],
  request_response: "",
  all_invitations_requests: [],
  user_header_photo: null
}

const mutations = {

  [PROFILE_ITEMS](state, result) {
    for (let i = 0; i < result.length; i++) {
      result[i].feedType = "NEW_ITEM";
      result[i]._id = uniqid();
      result[i].user = result[i].poster;
    }
    state.profile_items = result;
    let timeline = [];
    timeline = timeline.concat(state.profile_items);
    timeline = timeline.concat(state.profile_groups);
    timeline = timeline.sort(function (a, b) {
      return b.createdAt > a.createdAt;
    })
    state.profile_timeline = timeline;
  },

  [PROFILE_GROUPS](state, result) {
    for (let i = 0; i < result.length; i++) {
      result[i].feedType = "NEW_MEMBER";
      result[i]._id = uniqid();
      result[i].user = result[i].sUser;
    }
    state.profile_groups = result;
    let timeline = [];
    timeline = timeline.concat(state.profile_items);
    timeline = timeline.concat(state.profile_groups);
    timeline = timeline.sort(function (a, b) {
      return b.createdAt > a.createdAt;
    })
    state.profile_timeline = timeline;
  },

  [REGISTRATION_RESPONSE](state, result) {
    state.registration_response = result
  },

  [MY_NOTIFICATION](state, notifications) {
    state.my_notifications = notifications.notifications
  },

  [START_SESSION](state, user) {
    state.session_user = user
    state.is_authenticated = true
    localStorage.setItem('user_id', user.id)
  },

  [END_SESSION](state) {
    state.session_user = {}
    state.is_authenticated = false
  },

  [MY_SESSION](state, payload) {
    state.my_session = payload
  },

  [REFRESH_USER](state, user) {
    state.session_user = user
  },

  [UPDATE_USER](state, update) {
    update = update.user
    for (var key in update) {
      state.session_user[key] = update[key]
    }
    // state.session_user = user
  },

  [UPDATED_USER](state, update) {
    for (var key in update) {
      if (update[key] !== null) {
        state.updated_user[key] = update[key]
      } else {
        state.updated_user[key] = state.session_user[key]
      }
    }
  },
  // [USER_PROFILE] (state, payload) {
  //   state.user_profile[payload[0].id] = payload
  // },
  [USER_PROFILE](state, payload) {
    state.user_profile = payload
  },
  [CHANGE_PASSWORD](state, update) {
    for (var key in update) {
      state.session_user[key] = update[key]
    }
  },

  [UPDATE_THREADS](state, payload) {
    Vue.set(state.user_threads, state.session_user.id, payload)
  },

  [MY_INVITATIONS](state, payload) {
    // Vue.set(state.user_invitations, state.session_user.id, payload)
    state.my_invitations = payload
  },

  [SEARCH_USERS](state, payload) {
    state.search_results = payload
    // state.search_results = payload.results
    // state.search_query = payload.query
  },

  [MY_JOIN_REQUESTS](state, requests) {
    state.my_join_requests = requests
  },
  [MY_MODERATOR_INVITATIONS](state, payload) {
    state.my_moderator_invitations = payload
  },
  [REGISTER_SUCCESS](state) {
    state.registered = true
  },
  [PASSWORD_FORGOT](state, response) {
    state.request_response = response;
  },
  [RESET_RESPONSE](state) {
    state.request_response = ""
  },
  [SET_ALL_INVITATIONS_REQUESTS](state, payload) {
    state.all_invitations_requests = payload;
  },
  [HEADER_PHOTO](state, payload) {
    state.user_header_photo = payload;
  },
  [SET_REQUEST_RESPONSE](state, response) {
    state.request_response = response;
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
