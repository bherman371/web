export const getGroups = state => state.groups
export const getSearchResults = state => state.search_results
export const getGroupThreadsById = state => (id) => {
  return state.group_threads[id]
}
export const getGroupThreads = (state) => {
  return state.group_threads
}

export const getGroupInvitations = (state) => {
  return state.group_invitations
}

export const getGroupModeratorInvitations = (state) => {
  return state.group_moderator_invitations
}

export const getJoinRequests = state => state.join_requests

export const getModeratorID = (state) => {
  // console.log(state.moderator)
  if (state.moderator) return state.moderator.id
}

export const getModerator = (state) => state.moderator

export const getGroupProfile = state => state.group_profile

export const getModeratorInvitees = state => state.moderator_invitees

export const getGroupMembers = state => state.group_members

export const getJoinInvitations = state => state.join_invitations

export const getGroupMessageThreads = state => state.group_message_threads

export const getMyGroups = state => state.my_groups

export const getMyInvolvedGroups = state => state.my_involved_groups

export const getMyModeratedGroups = state => state.my_moderated_groups

export const getGroupMessages = (state, getters) => (id) => {
  // console.log(getters.getUser.username)
  for (let i = 0; i < state.groups_messages.length; i++) {
    if (state.groups_messages[i].groupId === id) {
      // console.log(state.groups_messages[i])
      let payload = JSON.parse(JSON.stringify(state.groups_messages[i]))
      for (let i = 0; i < payload.messages.length; i++) {
        console.log(payload.messages[i])
        if (payload.messages[i].u.username === getters.getUser.username) {
          payload.messages[i].author = 'me'
        } else {
          payload.messages[i].author = payload.messages[i].u.username
        }
        for (let j = 0; j < payload.users.members.length; j++) {
          if (payload.messages[i].u.username === payload.users.members[j].username) {
            payload.messages[i].u = payload.users.members[j]
          }
        }
      }
      return payload
    }
  }
  return {}
}

export const getCurrentGroup = state => state.current_group;

export const getCurrentGroupMembers = state => state.current_group_members;

export const getCurrentGroupTimeline = state => state.current_group_timeline;

export const getCurrentGroupItems = state => state.current_group_items;

export const getCurrentGroupMessages = state => state.current_group_messages;

export const getGroupsYouMayLIke = state => state.groups_you_may_like;

export const getNewGroupImage = state => state.new_group.image
export const getNewGroupImageOrientation = state => state.new_group.image_orientation
export const getNewGroupImageFile = state => state.image_file
export const getNewGroupTitle = state => state.new_group.name;
export const getNewGroupDescription = state => state.new_group.description;
export const getNewGroupPrivacy = state => state.new_group.privacy;
export const getNewGroupMembers = state => state.new_group.members;
export const getNewGroup = state => state.new_group;
export const getCreateNewGroupResponse = state => state.create_group_response;