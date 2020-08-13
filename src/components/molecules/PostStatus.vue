<template>
  <div class="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
    <form>
      <div class="author-thumb">
        <img :src="user.picture" alt="author" class="user-img"/>
      </div>
      <div class="form-group with-icon label-floating is-empty">
        <label class="control-label">Share what you are thinking here...</label>
        <textarea class="form-control" placeholder></textarea>
      </div>
      <div class="add-options-message">
        <a
          href="#"
          class="options-message"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="ADD PHOTOS"
        >
          <svg class="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-camera-icon" />
          </svg>
        </a>
        <a
          href="#"
          class="options-message"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="TAG YOUR FRIENDS"
        >
          <svg class="olymp-computer-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon" />
          </svg>
        </a>

        <a
          href="#"
          class="options-message"
          data-toggle="tooltip"
          data-placement="top"
          data-original-title="ADD LOCATION"
        >
          <svg class="olymp-small-pin-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-small-pin-icon" />
          </svg>
        </a>

        <button class="btn btn-primary btn-md-2">Post Status</button>
        <button class="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostStatus",
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
};
</script>

<style>
.user-img {
  height: 36px;
  width: 36px;
}
</style>