<template>
  <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
    <div class="ui-block" data-mh="friend-groups-item">
      <div class="friend-item friend-groups">
        <div class="friend-item-content">
          <div class="friend-avatar">
            <div class="author-thumb">
              <img :src="group.picture"  style="margin: 0" alt="Olympus" />
            </div>
            <div class="author-content">
            <router-link :to="`/s-app/group-page/${group.groupId}`">   
             <a href="#" class="h5 author-name">{{group.group.name}}</a>
            </router-link>

            </div>
          </div>
          <!-- TODO - Show settings only for group that the current user is the moderator -->
          <div class="control-block-button">
            <a href="#" class="btn btn-control btn-grey-lighter">
              <svg class="olymp-settings-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-settings-icon" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardGroup",
  props: ["group"]
};
</script>

<style>
</style>