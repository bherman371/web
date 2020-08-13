<template>
  <div class="mCustomScrollbar" data-mcs-theme="dark">
    <ul class="notification-list chat-message">
      <li class="message-unread">
        <div class="author-thumb">
          <img src="/img/avatar59-sm.jpg" alt="author" />
        </div>
        <div class="notification-event">
          <a href="#" class="h6 notification-friend">Diana Jameson</a>
          <span
            class="chat-message-item"
          >Hi James! It’s Diana, I just wanted to let you know that we have to reschedule...</span>
          <span class="notification-date">
            <time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time>
          </span>
        </div>
        <span class="notification-icon">
          <svg class="olymp-chat---messages-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
          </svg>
        </span>
        <div class="more">
          <svg class="olymp-three-dots-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatListItem"
};
</script>

<style>
</style>