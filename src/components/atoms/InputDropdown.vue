<template>
  <div class="dropdown open">
    <SInput
      type="text"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      v-model="filter"
      otherClasses="mb-0"
      @change="$emit('filter', filter)"
      :isSpinner="isLoading"
      label="Select friends to join in the group"
      :happyFace="happyFace"
    />

    <div class="dropdown-menu my-dropdown-fix w-100" v-show="isActive">
      <div v-for="item in options" :key="item.id">
        <div class="my-2 pl-3 dropdown-item" @click="$emit('user', item)">
          <div class="inline-items">
            <div class="author-thumb header-img">
              <img class="avatar header-img" :src="getUserImagePath(item)" />
            </div>
            <div class="birthday-author-name pl-1">
              <a class="author-name font-weight-bold">{{getUserName(item)}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHelperVue from "../../mixins/UserHelper.vue";
import SInput from "@/components/atoms/SInput";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
export default {
  name: "InputDropdown",
  props: ["options", "isLoading", "happyFace"],
  mixins: [UserHelperVue, ChatHelperVue],
  components: { SInput },
  model: {
    prop: "input",
    event: "change"
  },
  data() {
    return {
      filter: ""
    };
  },
  computed: {
    isActive() {
      if (this.options.length > 0 && this.filter.length > 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-dropdown-fix {
  bottom: auto !important;
}
.header-img {
  height: 34px;
  width: 34px;
}
</style>