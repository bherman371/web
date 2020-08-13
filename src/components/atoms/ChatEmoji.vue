<template>
  <div class="add-options-message">
    <a href="#" class="options-message" @click="$refs.attachments.click()">
      <svg class="olymp-computer-icon">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon" />
      </svg>
    </a>
    <div class="options-message smile-block">
      <svg class="olymp-happy-sticker-icon">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-happy-sticker-icon" />
      </svg>

      <ul class="more-dropdown more-with-triangle triangle-bottom-right">
        <li v-for="(item, index) in emojis" :key="index" @click="$emit('emoji', item)">
          <a href="#" class="h5">
            <p class="h5">{{String.fromCodePoint(item)}}</p>
          </a>
        </li>
      </ul>
    </div>
    <input
      type="file"
      ref="attachments"
      @change="$emit('file', $event.target.files)"
      class="d-none"
      name="image"
    />
  </div>
</template>

<script>
import ChatHelperVue from "../../mixins/ChatHelper.vue";
export default {
  name: "ChatEmoji",
  mixins: [ChatHelperVue],
};
</script>

<style>
</style>