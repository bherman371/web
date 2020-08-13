import * as getters from './getters'
import * as actions from './actions'
// import Image from '../../../modules/Image.js'
// import { loadImage } from '../../../modules/load-image.all.min.js'
// import { parseMetaData } from '../../../modules/load-image.js'
// import loadImage from 'blueimp-load-image'
// import { piexif } from 'piexifjs'
// import EXIF from 'exif'
const SET_ITEM_IMAGE = 'set_item_image'
const SET_ITEM_TITLE = 'set_item_title'
const SET_ITEM_DESCRIPTION = 'set_item_description'
const SET_ITEM_TYPE = 'set_item_type'
const SET_ITEM_PAYMENT_TYPE = 'set_item_payment_type'
const SET_ITEM_PAYMENT_VALUES = 'set_item_payment_values'
const SET_ITEM_CATEGORY = 'set_item_category'
const SET_ITEM_CONDITION = 'set_item_condition'
const SET_IMAGE_FILE = 'set_image_file'
const SET_IMAGE_ORIENTATION = 'set_item_image_orientation'
const ITEM_PROFILE = 'item_profile'
const RESET_NEW_ITEM = 'reset_new_item'
const UPDATED_ITEM = 'updated_item'
const UPDATE_ITEM = 'update_item'
// const ITEM_SEARCH_RESULTS = 'item_search_results'
const SEARCH_ITEMS = 'search_items'
const USER_INVENTORY = 'user_inventory'
const SEARCH_RESULT = "search_result"
const SEARCH_QUERY = "search_query"
const CLEAR_SEARCH = "clear_search"
const SEARCH_AUTOCOMPLETE = "search_autocomplete"
const ITEM_MESSAGES = "item_messages"
const ITEM_POST_MESSAGES = "item_post_messages"
const POST_ITEM_RESPONSE = "post_item_response"
const SET_ITEM_REQUESTS_MADE = "set_item_requests_made"
const SET_ITEM_REQUESTS_RECEIVED = "set_item_requests_received"
const initialState = {
  new_item: {
    title: '',
    description: '',
    image: '',
    image_orientation: 1,
    type: 0,
    payment_type: [],
    payment_value: 0,
    category: 0,
    condition: 0,
    ship: 0,
    subcategory: 0,
    points: 0,
    cash: 0,
    free: ""
  },
  item_search_results: [],
  item_search_query: null,
  image_file: '',
  item_profile: {},
  updated_item: {},
  user_inventory: [],
  search_result: [],
  search_autocomplete: [],
  item_messages: [],
  post_item_response: {},
  item_requests_made: {},
  item_requests_received: {}
}

const mutations = {
  [SET_ITEM_IMAGE](state, payload) {
    state.new_item.image = payload
  },
  [SET_ITEM_TITLE](state, payload) {
    state.new_item.title = payload
  },
  [SET_ITEM_DESCRIPTION](state, payload) {
    state.new_item.description = payload
  },
  [SET_ITEM_TYPE](state, payload) {
    state.new_item.type = payload
  },
  [SET_ITEM_PAYMENT_TYPE](state, payload) {
    if (Array.isArray(payload)) {
      state.new_item.payment_type = payload.map(value => { return value });
    } else {
      state.new_item.payment_type = payload;
    }
  },
  [SET_ITEM_PAYMENT_VALUES](state, payload) {
    state.new_item.cash = payload.cash
    state.new_item.points = payload.points
    state.new_item.free = payload.free
  },
  [SET_ITEM_CATEGORY](state, payload) {
    state.new_item.category = payload
  },
  [SET_ITEM_CONDITION](state, payload) {
    state.new_item.condition = payload
  },
  [SET_IMAGE_FILE](state, payload) {
    state.image_file = payload;
    state.new_item.image_file = payload;
  },
  [SET_IMAGE_ORIENTATION](state, payload) {
    state.new_item.image_orientation = payload
  },
  [ITEM_PROFILE](state, payload) {
    state.item_profile = payload
  },
  [RESET_NEW_ITEM](state) {
    state.new_item.title = ''
    state.new_item.description = ''
    state.new_item.image = ''
    state.new_item.image_orientation = 1,
      state.new_item.type = 0
    state.new_item.payment_type = []
    state.new_item.payment_value = 0
    state.new_item.category = 0
    state.new_item.condition = 0
    state.new_item.ship = 0
    state.new_item.subcategory = 0
    state.new_item.points = 0
    state.new_item.cash = 0
    state.new_item.free = ''
    state.image_file = ''
    state.item_profile = {}
  },
  [UPDATED_ITEM](state, update) {
    for (var key in update) {
      if (update[key] !== null) {
        state.updated_item[key] = update[key]
      } else {
        state.updated_item[key] = state.item_profile[key]
      }
    }
  },
  [UPDATE_ITEM](state, update) {
    update = update.item
    for (var key in update) {
      state.item_profile[key] = update[key]
    }
  },

  [SEARCH_ITEMS](state, payload) {
    state.item_search_results = payload
    // state.item_search_results = payload.results
    // state.item_search_query = payload.query
  },

  [USER_INVENTORY](state, payload) {
    state.user_inventory = payload
  },
  [SEARCH_QUERY](state, query) {
    state.item_search_query = query;
  },
  [CLEAR_SEARCH](state) {
    state.search_result = [];
  },
  [SEARCH_RESULT](state, { result, query }) {
    state.item_search_query = query;
    state.search_result = [];
    // console.log(result);
    // let arr = result.forEach(item => {
    //   console.log(item);
    //   item = item.map(data => {
    //     return {
    //       ...data,
    //       title: item.title,
    //       subTitle: item.condition,
    //       description: item.description,
    //       picture: item.picture,
    //     }
    //   })
    // })
    let arr = [];
    if (result.items) {
      result.items.map(item => {
        arr.push({
          ...item,
          title: item.title,
          subTitle: item.condition,
          description: item.description,
          picture: item.picture,
          class: "item"
        })
      })
    }
    if (result.groups) {
      result.groups.map(item => {
        arr.push({
          ...item,
          title: item.name,
          subTitle: item.zip,
          description: item.description,
          picture: item.picture,
          class: "group"
        })
      })
    }
    if (result.people) {
      result.people.map(item => {
        arr.push({
          ...item,
          title: item.firstName,
          subTitle: item.zip,
          description: item.description,
          picture: item.picture,
          class: "user"
        })
      })
    }
    state.search_result = arr;
  },
  [SEARCH_AUTOCOMPLETE](state, { result }) {
    state.search_autocomplete = [];

    let arr = [];
    if (result.items) {
      result.items.map(item => {
        arr.push({
          ...item,
          title: item.title,
          subTitle: item.condition,
          description: item.description,
          picture: item.picture,
          class: "item"
        })
      })
    }
    if (result.groups) {
      result.groups.map(item => {
        arr.push({
          ...item,
          title: item.name,
          subTitle: item.zip,
          description: item.description,
          picture: item.picture,
          class: "group"
        })
      })
    }
    if (result.people) {
      result.people.map(item => {
        arr.push({
          ...item,
          title: item.firstName,
          subTitle: item.zip,
          description: item.description,
          picture: item.picture,
          class: "user"
        })
      })
    }
    state.search_autocomplete = arr;
  },
  [ITEM_MESSAGES](state, payload) {
    state.item_messages = payload;
  },
  [ITEM_POST_MESSAGES](state, payload) {
    state.item_messages.push(payload);
  },
  [POST_ITEM_RESPONSE](state, response) {
    state.post_item_response = response;
  },
  [SET_ITEM_REQUESTS_MADE](state, payload) {
    state.item_requests_made = payload;
  },
  [SET_ITEM_REQUESTS_RECEIVED](state, payload) {
    state.item_requests_received = payload;
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
