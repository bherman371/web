import Vue from 'vue'
import uniqid from 'uniqid'
import * as getters from './getters'
import * as actions from './actions'

const GET_GROUPS = 'get_groups'
const SET_CURR_GROUP = 'set_group'
const SEARCH_GROUPS = 'search_groups'
const UPDATE_MESSAGES = 'update_messages'
const UPDATE_INVITATIONS = 'update_invitations'
const GROUP_MODERATOR_INVITATIONS = 'group_moderator_invitations'
const JOIN_REQUESTS = 'join_requests'
const MODERATOR = 'moderator'
const GROUP_PROFILE = 'group_profile'
const MODERATOR_INVITEES = 'moderator_invitees'
const GROUP_MEMBERS = 'group_members'
const JOIN_INVITATIONS = 'join_invitations'
const GROUP_MESSAGE_THREADS = 'group_message_threads'
const MY_GROUPS = 'my_groups'
const MY_INVOLVED_GROUPS = 'my_involved_groups'
const MY_MODERATED_GROUPS = 'my_moderated_groups'
const ADD_GROUP_MESSAGE = 'add_group_message'
const FETCH_GROUP = 'fetch_group'
const FETCH_GROUP_MEMBERS = 'fetch_group_members'
const FETCH_GROUP_ITEMS = 'fetch_group_items'
const FETCH_GROUP_MESSAGES = 'fetch_group_messages'
const FETCH_GROUPS_YOU_MAY_LIKE = 'fetch_group_you_may_like'
const SET_GROUP_IMAGE = 'set_group_image'
const SET_GROUP_IMAGE_FILE = 'set_group_image_file'
const SET_GROUP_IMAGE_ORIENTATION = 'set_group_image_orientation'
const SET_NEW_GROUP_DESCRIPTION = 'set_new_group_description'
const SET_NEW_GROUP_TITLE = 'set_new_group_title'
const SET_NEW_GROUP_PRIVACY = 'set_new_group_privacy'
const SET_NEW_GROUP_MEMBERS = 'set_new_group_members'
const SET_CREATE_NEW_GROUP_RESPONSE = 'set_create_new_group_response'
const RESET_NEW_GROUP = 'reset_new_group'

const initialState = {
  groups: [],
  search_results: [],
  group_threads: [],
  group_invitations: [],
  group_moderator_invitations: [],
  join_requests: [],
  moderator: null,
  group_profile: {},
  moderator_invitees: [],
  group_members: [],
  join_invitations: [],
  group_message_threads: {},
  my_involved_groups: [],
  my_groups: [],
  my_moderated_groups: [],
  groups_messages: [],
  current_group: {},
  current_group_members: [],
  current_group_timeline: [],
  current_group_items: [],
  current_group_messages: [],
  groups_you_may_like: [],
  new_group: {
    image: '',
    image_orientation: 1,
    image_file: '',
    name: '',
    description: '',
    privacy: '',
    members: []
  },
  image_file: '',
  create_group_response: ''
}

const mutations = {

  [SET_GROUP_IMAGE](state, payload) {
    state.new_group.image = payload
  },

  [SET_GROUP_IMAGE_FILE](state, payload) {
    state.image_file = payload;
    state.new_group.image_file = payload;
  },

  [SET_GROUP_IMAGE_ORIENTATION](state, payload) {
    state.new_group.image_orientation = payload
  },

  [FETCH_GROUPS_YOU_MAY_LIKE](state, groups) {
    state.groups_you_may_like = groups;
  },

  [FETCH_GROUP_MESSAGES](state, messages) {
    for (let i = 0; i < messages.length; i++) {
      messages[i].feedType = "GROUP_MESSAGE";
      messages[i]._id = uniqid();
      messages[i]._group = messages[i].group;
    }
    let timeline = [];
    timeline = timeline.concat(messages);
    timeline = timeline.concat(state.current_group_members);
    timeline = timeline.concat(state.current_group_items);
    timeline.sort(function (a, b) {
      if (a.createdAt == null) {
        return 1;
      }
      if (b.createdAt == null) {
        return -1;
      }
      return b.createdAt > a.createdAt;
    })
    state.current_group_messages = messages;
    state.current_group_timeline = timeline;
  },

  [FETCH_GROUP_ITEMS](state, items) {
    for (let i = 0; i < items.length; i++) {
      items[i].feedType = "NEW_ITEM";
      items[i]._id = uniqid();
      items[i].user = items[i].poster;
    }
    let timeline = [];
    timeline = timeline.concat(items);
    timeline = timeline.concat(state.current_group_members);
    timeline = timeline.concat(state.current_group_messages);
    timeline.sort(function (a, b) {
      if (a.createdAt == null) {
        return 1;
      }
      if (b.createdAt == null) {
        return -1;
      }
      return b.createdAt > a.createdAt;
    })
    state.current_group_items = items;
    state.current_group_timeline = timeline;
  },

  [FETCH_GROUP_MEMBERS](state, members) {
    for (let i = 0; i < members.length; i++) {
      members[i].feedType = "NEW_MEMBER";
      members[i]._id = uniqid();
      members[i].user = members[i].sUser;
    }
    let timeline = [];
    timeline = timeline.concat(members);
    timeline = timeline.concat(state.current_group_items);
    timeline = timeline.concat(state.current_group_messages);
    timeline.sort(function (a, b) {
      if (a.createdAt == null) {
        return 1;
      }
      if (b.createdAt == null) {
        return -1;
      }
      return b.createdAt > a.createdAt;
    })
    state.current_group_members = members;
    state.current_group_timeline = timeline;
  },

  [FETCH_GROUP](state, group) {
    state.current_group = group
  },

  [GET_GROUPS](state, groups) {
    state.groups = groups
  },

  [MY_GROUPS](state, groups) {
    state.my_groups = groups
  },
  [MY_INVOLVED_GROUPS](state, groups) {
    state.my_involved_groups = groups
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].group.id === state.group_profile.id) {
        state.group_profile = groups[i].group
      }
    }
  },
  [MY_MODERATED_GROUPS](state, groups) {
    state.my_moderated_groups = groups
  },

  [SET_CURR_GROUP](state, id) {
    state.current_group = id
  },

  [SEARCH_GROUPS](state, payload) {
    state.search_results = payload
  },

  [UPDATE_MESSAGES](state, payload) {
    state.groups_messages.push(payload)
  },

  [ADD_GROUP_MESSAGE](state, payload) {
    for (let i = 0; i < state.groups_messages.length; i++) {
      if (parseInt(state.groups_messages[i].groupId) === payload.groupId) {
        state.groups_messages[i].messages.unshift(payload.message)
        return
      }
    }
  },

  [UPDATE_INVITATIONS](state, payload) {
    Vue.set(state.group_invitations, payload[0].groupId, payload)
  },

  [GROUP_MODERATOR_INVITATIONS](state, payload) {
    Vue.set(state.group_moderator_invitations, payload[0].groupId, payload)
  },

  [JOIN_REQUESTS](state, requests) {
    state.join_requests = requests
  },

  [MODERATOR](state, obj) {
    state.moderator = obj
  },

  [GROUP_PROFILE](state, payload) {
    state.group_profile = payload
  },
  [MODERATOR_INVITEES](state, payload) {
    state.moderator_invitees = payload
  },
  [GROUP_MEMBERS](state, payload) {
    state.group_members = payload
  },
  [JOIN_INVITATIONS](state, payload) {
    state.join_invitations = payload
  },
  [GROUP_MESSAGE_THREADS](state, payload) {
    state.group_message_threads = payload
  },
  [SET_NEW_GROUP_DESCRIPTION](state, description) {
    state.new_group.description = description
  },
  [SET_NEW_GROUP_TITLE](state, title) {
    state.new_group.name = title;
  },
  [SET_NEW_GROUP_PRIVACY](state, privacy) {
    state.new_group.privacy = privacy;
  },
  [SET_NEW_GROUP_MEMBERS](state, members) {
    state.new_group.members = members;
  },
  [SET_CREATE_NEW_GROUP_RESPONSE](state, response) {
    state.create_group_response = response;
  },
  [RESET_NEW_GROUP](state) {
    state.new_group.image = '';
    state.new_group.image_orientation = 1;
    state.new_group.image_file = '';
    state.new_group.name = '';
    state.new_group.description = '';
    state.new_group.privacy = '';
    state.new_group.members = [];
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
