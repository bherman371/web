<template>
  <Modal :id="id" title="Write a Review" buttonName="Post" @button="postComment" ref="modal">
    <form class="form-write-rewiev">
      <div class="row">
        <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div class="form-group label-floating">
            <label class="control-label">Write a little description about the review</label>
            <TextArea v-model="text" type="textarea" />
          </div>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from "@/components/atoms/Modal";
import TextArea from "@/components/atoms/TextArea";
import ItemHelperVue from "../../mixins/ItemHelper.vue";
import CurrentUser from "@/mixins/CurrentUser";
export default {
  name: "ModaItemPostComment",
  props: ["id", "user"],
  components: {
    Modal,
    TextArea
  },
  data() {
    return {
      text: ""
    };
  },
  mixins: [ItemHelperVue, CurrentUser],
  methods: {
    postComment() {
      this.postItemMessage({ id: this.$route.params.id, text: this.text, user: this.currentUser });
      this.$refs.modal.closeModal();
    }
  }
};
</script>

<style>
</style>