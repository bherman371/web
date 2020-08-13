<template>
<div>
    <Modal
      :buttonName="nameButton"
      id="create-group"
      :title="titleHeader[step]"
      @button="next"
      :disabled="isDisabled"
      v-if="isShow"
      ref="modal"
      :isBackButton="true"
      backButtonName="Back"
      @back="returnStep"
      :backButtonVisible="isBackVisible"
      :canSkip="isSkippable"
      @skip="skipStep"
      @hidden="clearNewGroup"
    >
      <NewGroupImage v-if="stepper[step] === 'image'" />
      <NewGroupDescription v-if="stepper[step] === 'description'" ref="description" />
      <NewGroupPrivacy v-if="stepper[step] === 'privacy'" ref="privacy" />
      <NewGroupMembers v-if="stepper[step] === 'members'" ref="member" />
      <span v-if="alertMsg" v-html="`<p style='color:red'>${alertMsg}</p>`"></span>
    </Modal>

    <Modal
      buttonName="OK"
      id="new-group-result"
      title="Group created"
      @button="closeModal()"
      ref="modalResult"
    >
      <h5>The group {{createdGroup}} was created successfully!</h5>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/atoms/Modal.vue";
import NewGroupImage from "@/components/molecules/NewGroupImage.vue";
import NewGroupDescription from "@/components/molecules/NewGroupDescription.vue";
import NewGroupPrivacy from "@/components/molecules/NewGroupPrivacy.vue";
import NewGroupMembers from "@/components/molecules/NewGroupMembers.vue";
import { mapGetters } from "vuex";
import GroupHelperVue from "../../mixins/GroupHelper.vue";

export default {
  name: "ModalCreateGroup",
  components: {
    Modal,
    NewGroupImage,
    NewGroupDescription,
    NewGroupPrivacy,
    NewGroupMembers
  },
  mixins: [GroupHelperVue],
  data() {
    return {
      nameButton: "Next",
      titleHeader: [
        "Add an image for your new group",
        "Give your group a name and describe its purpose",
        "Choose your group's privacy setting",
        "Select members"
      ],
      stepper: ["image", "description", "privacy", "members"],
      step: 0,
      isShow: true,
      alertMsg: null,
      testAgainst: [1, 2, 3],
      result: null,
      createdGroup: null
    };
  },
  methods: {
    async next() {
      this.alertMsg = null;
      if (this.step === 1) {
        this.$refs.description.storeDescription();
        if (!this.groupTitle || !this.groupDescription) {
          this.alertMsg =
            "Please, complete the form to proceed to the next step.";
        }
      }
      if (this.step === 2) {
        this.$refs.privacy.storePrivacy();
      }
      if (this.step === 3) {
        this.result = null;
        this.createdGroup = null;
        this.$refs.member.storeMembers();
        await this.tryCreateNewGroup();
      }
      if (this.canGoNext) {
        if (this.step < 3) {
          this.step++;
        } else {
          this.createdGroup = this.groupTitle;
          this.$refs.modal.closeModal();
          $("#new-group-result").modal("show");
        }
      }
    },
    returnStep() {
      if (this.step > 0) this.step--;
    },
    skipStep() {
      this.step++;
    },
    async tryCreateNewGroup() {
      const res = await this.createNewGroup({ group: this.newGroup });
      if (res && res.result === `Group ${this.groupTitle} created!`) {
        this.result = res.result;
      } else {
        this.alertMsg = res.result;
      }
    },
    clearNewGroup() {
      this.resetNewGroup();
      this.step = 0;
    },
    closeModal() {
      this.$refs.modalResult.closeModal();
    }
  },
  watch: {
    step() {
      if (this.step === 3) {
        this.nameButton = "Create";
      } else {
        this.nameButton = "Next";
      }
    }
  },
  computed: {
    ...mapGetters({
      groupPostFeaturedImage: "getNewGroupImage",
      groupTitle: "getNewGroupTitle",
      groupDescription: "getNewGroupDescription",
      groupPrivacy: "getNewGroupPrivacy",
      getNewGroupMembers: "getNewGroupMembers"
    }),
    isBackDisabled() {
      if (this.step === 0) return true;
      return false;
    },
    canGoNext() {
      switch (this.stepper[this.step]) {
        case "image":
          if (this.groupPostFeaturedImage) {
            return true;
          }
          return false;
        case "description":
          if (this.groupTitle && this.groupDescription) {
            return true;
          }
          return false;
        case "privacy":
          if (this.testAgainst.some(item => item === this.groupPrivacy)) {
            return true;
          }
          return false;
        case "members":
          if (this.result === `Group ${this.groupTitle} created!`) {
            return true;
          }
          return false;
        default:
          return false;
      }
    },
    isBackVisible() {
      if (this.step === 0) return false;
      return true;
    },
    isSkippable() {
      if (
        this.step === 0 &&
        (!this.groupPostFeaturedImage ||
          this.groupPostFeaturedImage.image === null)
      ) {
        return true;
      }
      return false;
    },
    isDisabled() {
      if (
        this.step === 0 &&
        (!this.groupPostFeaturedImage ||
          this.groupPostFeaturedImage.image === null)
      ) {
        return true;
      } else if (this.step === 2) {
        if (this.testAgainst.some(item => item === this.groupPrivacy)) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
