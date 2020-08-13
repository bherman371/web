export const getUser = state => {
  return state.session_user
}
export const isUserAuthenticated = state => state.is_authenticated
export const getUserProfileById = state => (id) => {
  return state.user_profile[id]
}
export const getUserThreadsById = state => (id) => {
  return state.user_threads[id]
}
export const getUserThreads = (state) => {
  return state.user_threads
}
export const getUserInvitations = (state) => {
  return state.user_invitations
}
export const getUserInvitationsById = state => (id) => {
  return state.user_invitations[id]
}

export const getMyJoinRequests = state => state.my_join_requests

export const getUserProfile = state => state.user_profile
export const getMyInvitations = state => state.my_invitations
export const getMyModeratorInvitations = state => state.my_moderator_invitations

export const getMySession = state => {
  return state.my_session
}

export const getUserSearchResults = state => {
  return state.search_results
}

export const getUserSearchQuery = state => {
  return state.search_query
}

export const getMyNotifications = state => {
  return state.my_notifications
}

export const getSuccessNotification = state => {
  return state.registered
}

export const getRegistrationErrorResponse = state => {
  return state.registration_response;
}

export const getProfileItems = state => {
  return state.profile_items;
}

export const getProfileGroups = state => {
  return state.profile_groups;
}

export const getProfileTimeline = state => {
  return state.profile_timeline;
}

export const getRequestResponse = state => {
  return state.request_response;
}

export const getAllMyInvitesAndRequests = state => {
  return state.all_invitations_requests;
}

export const getHeaderUserPhoto = state => {
  return state.user_header_photo;
}