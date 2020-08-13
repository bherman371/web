<template>
  <div class="ui-block">
    <div class="ui-block-title">
      <h6 class="title">Profile intro</h6>
    </div>
    <div class="ui-block-content">
      <ul class="widget w-personal-info item-block">
        <li>
          <span class="title">About me:</span>
          <span
            class="text"
          >{{about}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAboutMe",
  props: ["about"]
};
</script>

<style>
</style>