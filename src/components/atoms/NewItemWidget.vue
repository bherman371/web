<template>
  <div>
    <a href="#" v-if="isUserAuthenticated" data-toggle="modal" data-target="#new-item">
      <div class="widget w-build-fav">
        <div class="widget-thumb">
          <img src="/img/build-fav.png" alt="notebook" />
        </div>

        <div class="content">
          <h4 class="title">Post your item in seconds!</h4>
          <p>
            Click here and see how easy it is!
          </p>
        </div>
      </div>
    </a>
    <router-link v-else to="/">
      <div class="widget w-build-fav">
        <div class="widget-thumb">
          <img src="/img/build-fav.png" alt="notebook" />
        </div>

        <div class="content">
          <h4 class="title">Post your item in seconds!</h4>
          <p>
            Click here and see how easy it is!
          </p>
        </div>
      </div>
    </router-link>
    <NewItem />
  </div>
</template>

<script>
import NewItem from "@/components/organisms/NewItem";
import { mapGetters } from 'vuex';

export default {
  name: "NewItemWidget",
  components: {
    NewItem
  },
  computed: {
    ...mapGetters({
      isUserAuthenticated: "isUserAuthenticated"
    })
  }
};
</script>

<style>
</style>