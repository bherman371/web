<template>
  <div class="container">
    <div class="row">
      <div
        class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
      >
        <div class="row">
          <div class="col col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 padding-l-0">
            <div class="chat-field">
              <div class="mCustomScrollbar" data-mcs-theme="dark">
                <ul class="notification-list chat-message chat-message-field">
                  <li>
                    <div class="author-thumb">
                      <img src="/img/avatar10-sm.jpg" alt="author" />
                    </div>
                    <div class="notification-event">
                      <a href="#" class="h6 notification-friend">Elaine Dreyfuss</a>
                      <span class="notification-date">
                        <time
                          class="entry-date updated"
                          datetime="2004-07-24T18:18"
                        >Yesterday at 8:10pm</time>
                      </span>
                      <span
                        class="chat-message-item"
                      >Hi James, How are your doing? Please remember that next week we are going to Gotham Bar to celebrate Marina’s Birthday.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessageCard"
};
</script>

<style>
</style>