  <template>
  <div
    class="modal fade"
    id="update-header-photo"
    tabindex="-1"
    role="dialog"
    aria-labelledby="update-header-photo"
    aria-hidden="true"
  >
    <div class="modal-dialog window-popup update-header-photo" role="document">
      <div class="modal-content">
        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
          <svg class="olymp-close-icon">
            <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
          </svg>
        </a>
        <div class="modal-header">
          <h6 class="title" v-if="modalId === 'update-header-photo'">Update Header Photo</h6>
          <h6 class="title" v-else>Update Profile Photo</h6>
        </div>
        <ModalUpdateHeaderPhoto v-if="modalId === 'update-header-photo'" />
        <ModalUpdateProfilePhoto v-if="modalId === 'update-profile-photo'" />
      </div>
    </div>
  </div>
</template>

<script>
import ModalUpdateHeaderPhoto from "@/components/molecules/ModalUpdateHeaderPhoto";
import ModalUpdateProfilePhoto from "@/components/molecules/ModalUpdateProfilePhoto";
import UserHelperVue from "../../mixins/UserHelper.vue";
import ItemHelperVue from "../../mixins/ItemHelper.vue";
export default {
  name: "ModalUpdatePhoto",
  props: ["photo", "modalId"],
  mixins: [UserHelperVue, ItemHelperVue],
  components: {
    ModalUpdateHeaderPhoto,
    ModalUpdateProfilePhoto
  }
};
</script>

<style lang="scss" scoped>
</style>
