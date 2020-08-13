<template>
  <div v-cloak @drop.prevent="onFileChange" @dragover.prevent>
    <a class="upload" @click="trigger()">
      <svg v-if="!image" class="olymp-computer-icon">
        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon" />
      </svg>
      <img
        v-else
        id="newGroupImage"
        class="img-responsive"
        :style="exif_rotate"
        :src="groupPostFeaturedImage.image"
        alt="Photo"
      />
      <div v-if="!image">
        <h6>Upload Photo</h6>
        <span>Browse your computer.</span>
      </div>
      <input
        type="file"
        ref="fileInput"
        class="input-file"
        style="display: none;"
        @change="onFileChange"
        accept="image/*"
      />
    </a>
  </div>
</template>

<script>
import ImageModule from "@/modules/Image";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewGroupImage",
  data() {
    return {
      image: null,
      image_file: "",
      progress: 0,
      upload_complete: false,
      valid_img: true,
      exif_rotate: ""
    };
  },
  computed: {
    ...mapGetters({
      groupPostFeaturedImage: "getNewGroupImage"
    })
  },
  watch: {
    image: function() {
      this.setNewGroupImage({ image: this.image });
      this.setNewGroupImageFile({ imageFile: this.image_file });
      this.$emit("file", this.image_file);
    },
    newitem_image_orientation: function(val) {
      this.updateImageOrientation(val);
    }
  },
  methods: {
    ...mapActions([
      "setNewGroupImage",
      "setNewGroupImageFile",
      "setNewGroupImageOrientation"
    ]),
    trigger() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      let self = this;

      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return false;
      } else if (
        files[0]["type"] !== "image/jpeg" &&
        files[0]["type"] !== "image/png"
      ) {
        self.valid_img = false;
        self.image = null;
        return false;
      }

      self.valid_img = true;
      this.loadImage(files[0]);
    },
    loadImage(file) {
      // let self = this;
      ImageModule.getOrientation(file, orientation => {
        this.setNewGroupImageOrientation({ imageOrientation: orientation });
      });
      var reader = new FileReader();
      var vm = this;
      vm.image_file = file;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateImageOrientation(val) {
      let self = this;
      // self.exif_rotate = 'display: none;'
      self.exif_rotate = "";
      switch (val) {
        case 1:
        case -1:
          self.exif_rotate += "";
          break;
        case 2:
          self.exif_rotate += "transform: scale(-1, 1)";
          break;
        case 3:
          self.exif_rotate += "transform: rotate(180deg)";
          break;
        case 4:
          self.exif_rotate +=
            "transform: rotate(180deg);transform: scale(-1, 1)";
          break;
        case 5:
          self.exif_rotate +=
            "transform: rotate(90deg);transform: scale(-1, 1)";
          break;
        case 6:
          self.exif_rotate += "transform: rotate(90deg)";
          break;
        case 7:
          self.exif_rotate +=
            "transform: rotate(270deg);transform: scale(-1, 1)";
          break;
        case 8:
          self.exif_rotate += "transform: rotate(270deg)";
          break;
      }
    }
  },
  mounted() {
    if (this.groupPostFeaturedImage.image) {
      this.image = this.groupPostFeaturedImage.image;
    }
  }
};
</script>

<style lang="scss" scopde>
.upload {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  fill: #c2c5d9;
  cursor: pointer;
}
</style>
