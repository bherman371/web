<template>
  <div class="ui-block">
    <!-- Post -->

    <article class="hentry post">
      <div class="post__author author vcard inline-items">
        <img :src="userCard.picture" alt="author" />

        <div class="author-date">
          <router-link to="s-app/profile-page/:id">
            <a class="h6 post__author-name fn">{{userCard.firstName}}</a>
          </router-link> 
          <!-- <div class="post__date">
            <time class="published" datetime="2017-03-24T18:18">19 hours ago</time>
          </div>-->
        </div>

        <div class="more">
          <svg class="olymp-three-dots-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
          </svg>
          <ul class="more-dropdown">
            <li>
              <a href="#">Edit Post</a>
            </li>
            <li>
              <a href="#">Delete Post</a>
            </li>
            <li>
              <a href="#">Turn Off Notifications</a>
            </li>
            <li>
              <a href="#">Select as Featured</a>
            </li>
          </ul>
        </div>
      </div>

      <p>{{msgPost}}</p>

      <!-- video section -->
      <article class="hentry post video" v-if="videoUrl">
        <div class="post-video">
          <div class="video-thumb">
            <img src="/img/video5.jpg" alt="photo" />
            <a href="https://youtube.com/watch?v=excVFQ2TWig" class="play-video">
              <svg class="olymp-play-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-play-icon" />
              </svg>
            </a>
          </div>

          <div class="video-content">
            <a href="#" class="h4 title">System of a Revenge - Nothing Else Matters (LIVE)</a>
            <p>Lorem ipsum dolor sit amet, consectetur ipisicing elit, sed do eiusmod tempo incididunt ut labore..</p>
            <a href="#" class="link-site">YOUTUBE.COM</a>
          </div>
        </div>
      </article>
      <!-- end video section -->

      <!-- picture and comment section -->
      <div v-if="picture">
        <div class="post-thumb">
          <img src="/img/post-photo6.jpg" alt="photo" />
        </div>

        <ul class="children single-children">
          <li class="comment-item">
            <div class="post__author author vcard inline-items">
              <img src="/img/avatar8-sm.jpg" alt="author" />
              <div class="author-date">
                <a class="h6 post__author-name fn" href="#">Diana Jameson</a>
                <div class="post__date">
                  <time class="published" datetime="2017-03-24T18:18">16 hours ago</time>
                </div>
              </div>
            </div>

            <p>Here’s the first photo of our incredible photoshoot from yesterday. If you like it please say so and tel me what you wanna see next!</p>
          </li>
        </ul>
      </div>
      <!-- end picture and comment section -->
      <div class="post-additional-info inline-items">
        <a href="#" class="post-add-icon inline-items">
          <svg class="olymp-heart-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-heart-icon" />
          </svg>
          <span>8</span>
        </a>

        <ul class="friends-harmonic">
          <li>
            <a href="#">
              <img src="/img/friend-harmonic7.jpg" alt="friend" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/img/friend-harmonic8.jpg" alt="friend" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/img/friend-harmonic9.jpg" alt="friend" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/img/friend-harmonic10.jpg" alt="friend" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/img/friend-harmonic11.jpg" alt="friend" />
            </a>
          </li>
        </ul>

        <div class="names-people-likes">
          <a href="#">Jenny</a>,
          <a href="#">Robert</a> and
          <br />6 more liked this
        </div>

        <div class="comments-shared">
          <a href="#" class="post-add-icon inline-items">
            <svg class="olymp-speech-balloon-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
            </svg>
            <span>17</span>
          </a>

          <a href="#" class="post-add-icon inline-items">
            <svg class="olymp-share-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
            </svg>
            <span>24</span>
          </a>
        </div>
      </div>

      <div class="control-block-button post-control-button">
        <a href="#" class="btn btn-control featured-post">
          <svg class="olymp-trophy-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-trophy-icon" />
          </svg>
        </a>

        <a href="#" class="btn btn-control">
          <svg class="olymp-like-post-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-like-post-icon" />
          </svg>
        </a>

        <a href="#" class="btn btn-control">
          <svg class="olymp-comments-post-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
          </svg>
        </a>

        <a href="#" class="btn btn-control">
          <svg class="olymp-share-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-share-icon" />
          </svg>
        </a>
      </div>
    </article>

    <!-- .. end Post -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ActivityCard",
  props: ["userCard", "msgPost"],
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
};
</script>

<style>
</style>