<template>
  <div>
    <div class="text-center">
      <a href="#" class="upload-photo-item borders" v-if="!result">
        <ItemPostImage @file="setImg" />
        <SButton
          @button="submitPhoto"
          text="Confirm Photo"
          color="primary"
          size="md"
          class="mt-5"
          :disabled="btnDisabled"
        />
      </a>
      <div v-else class="m-5 text-danger">Something went wrong!</div>
    </div>
  </div>
</template>

<script>
import ItemPostImage from "@/components/molecules/ItemPostImage";
import SButton from "@/components/atoms/SButton";
import UserHelperVue from "../../mixins/UserHelper.vue";
export default {
  name: "ModalUpdateHeaderPhoto",
  components: {
    ItemPostImage,
    SButton
  },
  mixins: [UserHelperVue],
  data() {
    return {
      img: null,
      result: false
    };
  },
  computed: {
    btnDisabled() {
      if (this.img) return false;
      return true;
    }
  },
  methods: {
    async submitPhoto() {
      var data = new FormData();

      data.append("image", this.img);

      const res = await this.uploadHeaderPhoto({
        photo: data,
        id: this.loggedUser.id
      });
      if (res.result === "Picture updated!") {
        window.location.reload();
      } else {
        this.result = true;
        setTimeout(() => {
          this.result = false;
        }, 3000);
      }
    },
    setImg(file) {
      if (file) this.img = file;
    }
  }
};
</script>


<style lang="scss" scoped>
.borders {
  border-left: none;
}
</style>