<template>
  <div class="position-relative">
    <SInput
      type="text"
      v-model="query"
      label="Select users to invite to the group"
      otherClasses="mb-0"
      :isSpinner="fetching"
      :happyFace="!fetching"
      @atFocus="isInputFocused = true"
      @atBlur="isInputFocused = false"
    />
    <div class="autocomplete-positioning text-left">
      <SearchAutocompleteResults
        :query="query"
        :isInputFocused="isInputFocused"
        attachToInput
        :returnsTheItem="true"
        filterType="user"
        :excludeUsersId="chosenUsersId"
        @user="setUsers"
        @fetching="setFetching"
      />
    </div>
    <div v-if="chosenUsers.length > 0" class="user-container mt-4">
      <div v-for="(item, index) in chosenUsers" :key="item.id">
        <div class="my-2 pl-3 container" @click="$emit('user', item)">
          <div class="row">
            <div class="col mr-1 row-bg p-2 rounded">
              <div class="author-thumb header-img float-left">
                <img class="avatar header-img" :src="getUserImagePath(item)" />
              </div>
              <div class="birthday-author-name float-left mt-2">
                <a class="author-name font-weight-bold">{{getUserName(item)}}</a>
              </div>
              <svg class="close-icon float-right mt-2" @click="removeUser(index)">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-little-delete" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h5
      v-if="chosenUsers.length > 0"
      class="float-right mr-3 mt-2"
    >
      {{chosenUsers.length}} user<span v-if="chosenUsers.length > 1">s</span> selected
    </h5>
  </div>
</template>

<script>
import SInput from "@/components/atoms/SInput";
import SearchAutocompleteResults from "@/components/molecules/SearchAutocompleteResults.vue";
import ChatHelperVue from "../../mixins/ChatHelper.vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
import GroupHelperVue from "../../mixins/GroupHelper.vue";

export default {
  name: "NewGroupMembers",
  mixins: [ChatHelperVue, UserHelperVue, GroupHelperVue],
  components: {
    SInput,
    SearchAutocompleteResults
  },
  data() {
    return {
      chosenUsers: [],
      chosenUsersId: [],
      fetching: false,
      timeStampFromLastChar: null,
      query: "",
      isInputFocused: false
    };
  },
  methods: {
    setUsers(u) {
      if (!this.chosenUsers.some(item => item.id === u.id))
        this.chosenUsers.push(u);
        this.chosenUsersId.push(u.id);
    },
    removeUser(index) {
      this.chosenUsers.splice(index, 1);
      this.chosenUsersId.splice(index, 1);
    },
    storeMembers() {
      let users = this.chosenUsers;
      this.setNewGroupMembers(users);
    },
    setFetching(newValue) {
      this.fetching = newValue;
    }
  },
  mounted() {
    if (this.getNewGroupMembers) {
      this.chosenUsers = this.getNewGroupMembers;
      this.chosenUsers.forEach(user => this.chosenUsersId.push(user.id));
    }
  }
};
</script>

<style scoped>
.header-img {
  height: 34px;
  width: 34px;
}
.close-icon {
  height: 14px;
  width: 14px;
  cursor: pointer;
  fill: lightslategray;
}
.row-bg {
  background-color: whitesmoke;
}
.user-container {
  max-height: 200px;
  overflow-y: auto;
}
.autocomplete-positioning {
  position: absolute;
  z-index: 10010;
  left: 0;
  width: 100%;
}
</style>