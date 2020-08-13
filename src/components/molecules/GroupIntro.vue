<template>
    <div class="ui-block">
      <div class="ui-block-title">
        <h6 class="title">About</h6>
        <a href="#" class="more">
          <svg class="olymp-three-dots-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
          </svg>
        </a>
      </div>
      <div class="ui-block-content">
        <ul class="widget w-personal-info item-block">
          <li>
            <span
              class="text"
            >{{ group.description }}</span>
          </li>
          <li>
            <span class="title">Created:</span>
            <span class="text">{{ group.createdAt }}</span>
          </li>
          <li>
            <span class="title">Based in:</span>
            <span class="text">{{ group.zip }}</span>
            <!-- TODO - set zip groups-->
          </li>
          <li>
            <span class="title">Moderator:</span>
            <a href="#" class="text">{{ group.moderator }}</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "GroupIntro",
  props: [
    'group'
  ],
  mounted() {
    console.log(this.group)
  }
};
</script>

<style>
</style>
