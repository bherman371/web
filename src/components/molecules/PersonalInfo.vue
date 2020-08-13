<template>
  <div class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
    <div class="ui-block">
      <div class="ui-block-title">
        <h6 class="title">Personal information</h6>
      </div>
      <div class="ui-block-content card-header">
        <!-- Personal Information Form  -->
        <form>
          <div class="row">
            <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
              <SInput
                label="Username"
                type="text"
                v-model="personalInformation.username"
                :disabled="true"
              />
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                label="First name"
                type="text"
                v-model="personalInformation.firstName"
              />
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                label="Last name"
                type="text"
                v-model="personalInformation.lastName"
              />
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <div class="form-group label-floating">
                <label class="control-label">Write a little description about you</label>
                <textarea class="form-control" v-model="personalInformation.description"></textarea>
              </div>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <SInput
                label="Zip code"
                type="text"
                v-model="personalInformation.zip"
              />
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <button
                class="btn btn-secondary btn-lg full-width"
                @click="restore"
              >
                Restore all attributes
              </button>
            </div>
            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
              <button
                class="btn btn-green btn-lg full-width"
                @click="saveChanges"
              >
                Save all changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="ui-block-content card-header">
        <!-- Profile image  -->
        <div class="row">
          <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="field is-horizontal form-group">
              <div class="field-label is-normal">
                <label id="formLabel_picture" class="label">Profile image</label>
              </div>
              <div class="field-body form-control">
                <div class="contain-update-img form-group row mb-0 align-items-center">
                  <div class="col col-lg-4 col-md-4 col-sm-12 col-12 text-center">
                  <img
                    :src="image"
                    class="image-responsive"
                    width="100"
                    height="100"
                  />
                  </div>
                  <div class="col col-lg-8 col-md-8 col-sm-12 col-12">
                    <div class="m-auto" style="width: min-content">
                    <input
                      id="profile_picture"
                      name="profile_picture"
                      type="file"
                      class="input--file"
                      style="display: none;"
                      @change="onFileChange"
                      ref="profileImage"
                      accept="image/*"
                    />
                    <input
                      type="button"
                      class="btn btn-lg mb-1"
                      :class="{
                        'btn-green': image_file === '',
                        'btn-secondary': image_file !== ''
                      }"
                      @click="trigger()"
                      value="Choose a new image"
                    />
                    <input
                      v-if="image_file !== ''"
                      type="button"
                      class="btn btn-primary btn-lg mb-0"
                      @click="updatePhoto"
                      value="Update image"
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-block-content">
        <!-- Deactive account  -->
        <div class="row">
          <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="form-group label-floating">
              <label>Deactive account</label>
              <p>Deactivation puts your account on hold. Your information, including the items you posted, will be saved, but will not be visible to other users. Other users will not be able to find you on the platform and you will no longer receive notifications from Swampum. You can reactivate your account at any time just by logging into the system.</p>
            </div>
            <div>
              <button class="btn btn-primary btn-lg full-width" @click="deactive">Deactive</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ... end Personal Information Form  -->
    </div>
    <Modal
      id="modalPersonalInfo"
      :title="modalTitle"
      buttonName="OK"
      @button="closeModal"
      ref="modal"
      @hidden="doTheAction()"
    >
      {{result}}<span
        v-if="modal === 'deactivation' && result === 'Deactivation successful'"
      v-html="`.<br>You can reactivate your account at any time just by logging into the system again.`"></span>
    </Modal>
  </div>
</template>

<script>
import ImageModule from "@/modules/Image";
import { mapActions, mapGetters } from "vuex";
import UserHelperVue from '../../mixins/UserHelper.vue';
import SInput from "@/components/atoms/SInput.vue";
import Modal from "@/components/atoms/Modal.vue";
import Auth from "@/modules/Auth.js";

export default {
  name: "PersonalInfo",
   data() {
    return {
      image: null,
      image_file: "",
      progress: 0,
      upload_complete: false,
      valid_img: true,
      exif_rotate: "",
      personalInformation: {
        username: "",
        firstName: "",
        lastName: "",
        description: "",
        zip: ""
      },
      result: null,
      modal: null
    };
  },
  components: { SInput, Modal },
  computed: {
    ...mapGetters({
      user: "getUser"
    }),
    modalTitle() {
      if (this.modal === "info") {
        return "Update personal information";
      } else if (this.modal === "image") {
        return "Update personal image"
      } else if (this.modal === "deactivation") {
        return "Account deactivation";
      }
      return null;
    }
  },
  mixins: [UserHelperVue],
  watch: {
    user: function(newUser) {
      if (newUser) {
        this.image = this.getUserImagePath(newUser);
        this.personalInformation.username = this.user.username;
        this.personalInformation.firstName = this.user.firstName;
        this.personalInformation.lastName = this.user.lastName;
        this.personalInformation.description = this.user.description;
        this.personalInformation.zip = this.user.zip;
      }
    }
  },
  methods: {
    ...mapActions([
      "setImageOrientation",
      "prepareUpdatedUser",
      "updateUser",
      "updateProfilePhoto",
      "deactivation",
      "endSession"
    ]),
    restore(e) {
      e.preventDefault();
      this.personalInformation.username = this.loggedUser.username;
      this.personalInformation.firstName = this.loggedUser.firstName;
      this.personalInformation.lastName = this.loggedUser.lastName;
      this.personalInformation.description = this.loggedUser.description;
      this.personalInformation.zip = this.loggedUser.zip;
    },
    trigger() {
      this.$refs.profileImage.click();
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
        this.setImageOrientation({ imageOrientation: orientation });
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
    },
    async saveChanges(e) {
      e.preventDefault();
      this.modal = "info";
      await this.prepareUpdatedUser({...this.personalInformation});
      await this.updateUser();
      this.result = 'Information updated!';
      $('#modalPersonalInfo').modal("show");
    },
    async updatePhoto() {
      this.modal = "image";
      var data = new FormData();

      data.append("image", this.image_file);

      const res = await this.updateProfilePhoto({
        photo: data,
        id: this.loggedUser.id
      });
      if (res.result === "Picture updated!") {
        this.result = res.result;
      } else {
        this.result = 'Something went wrong!';
      }
      $('#modalPersonalInfo').modal("show");
    },
    closeModal() {
      this.$refs.modal.closeModal();
    },
    doTheAction() {
      if (this.modal === "image" && this.result === "Picture updated!") {
        window.location.reload();
      } else if (this.modal === "deactivation" && this.result === "Deactivation successful") {
        this.logout();
      }
    },
    logout() {
      this.endSession();
      Auth.deauthenticateUser();
      localStorage.removeItem("user_id");
      this.$router.push("/");
    },
    async deactive() {
      this.modal = "deactivation";
      const res = await this.deactivation(this.user.id);
      if (res.result === "Deactivation successful") {
        this.result = res.result;
      } else {
        this.result = 'Something went wrong!';
      }
      $('#modalPersonalInfo').modal("show");
    }
  },
  mounted() {
    if (this.loggedUser.id) {
      this.image = this.getUserImagePath(this.loggedUser);
    }
    if (this.loggedUser.username) {
      this.personalInformation.username = this.loggedUser.username;
    }
    if (this.loggedUser.firstName) {
      this.personalInformation.firstName = this.loggedUser.firstName;
    }
    if (this.loggedUser.lastName) {
      this.personalInformation.lastName = this.loggedUser.lastName;
    }
    if (this.loggedUser.description) {
      this.personalInformation.description = this.loggedUser.description;
    }
    if (this.loggedUser.zip) {
      this.personalInformation.zip = this.loggedUser.zip;
    }
  }
};
</script>

<style>
</style>