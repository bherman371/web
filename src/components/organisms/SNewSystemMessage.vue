<template>
  <div>
    <div class="ui-block">
      <!-- Post -->

      <article class="hentry post">
        <div class="post__author author vcard inline-items">
          <img src="/img/favicon.png" alt="author" />

          <div class="author-date">
            <a class="h6 post__author-name fn">Swampum has sent a new message</a>
            <div class="post__date">
              <time class="published" datetime="2017-03-24T18:18">{{ getTimeAgo(message.createdAt) }}</time>
            </div>
          </div>
        </div>
        <p>
          {{ message.message }}
        </p>
      </article>

      <!-- .. end Post -->
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: "SNewSystemMessage",
  props: [
    'message'
  ],
  data () {
    return {
      msg: ""
    }
  },
  methods: {
    getTimeAgo(time) {
      return moment(time).fromNow();
    }
  }
}
</script>
