export const getUserMessages = (state) => {
  return state.userMessages;
}

export const getModeratorMessages = (state) => {
  return state.moderatorMessagesAsMember.filter(chat => chat.isOpen);
}

export const getOpenChats = state => {
  return state.openChats;
}

export const getNewMsgsCounter = state => {
  return state.newMessagesCounter;
}

export const getStateWindowChat = state => {
  return state.windowChatState;
}

export const getWindowChatMsgs = state => {
  return state.windowChatMsgs;
}