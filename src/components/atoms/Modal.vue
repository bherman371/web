<template>
  <div>
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="create-friend-group-add-friends"
      aria-hidden="true"
    >
      <div
        class="modal-dialog window-popup create-friend-group create-friend-group-add-friends"
        role="document"
      >
        <div class="modal-content">
          <a
            href="#"
            class="close icon-close"
            data-dismiss="modal"
            aria-label="Close"
            ref="closeButton"
          >
            <svg class="olymp-close-icon">
              <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
            </svg>
          </a>
          <div class="modal-header p-2">
            <h4 class="modal-dialog mt-2">{{title}}</h4>
          </div>

          <div class="modal-body text-center">
            <slot name="default"></slot>
          </div>
          <div class="text-center">
            <slot name="footer">
              <SButton
                v-if="isBackButton && backButtonVisible"
                :text="backButtonName"
                color="primary"
                size="md"
                class="mr-3"
                @button="$emit('back')"
                :disabled="backButtonDisabled"
              />
              <SButton
                v-if="buttonName"
                :text="buttonName"
                color="blue"
                size="md"
                class="text-white"
                @button="$emit('button')"
                :disabled="disabled"
              />
              <span
                v-if="canSkip"
                class="skip"
                @click="$emit('skip')"
              >
                Skip
              </span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SButton from "@/components/atoms/SButton";

export default {
  name: "Modal",
  model: {
    prop: "input",
    event: "change"
  },
  components: {
    SButton
  },
  props: [
    "buttonName",
    "title",
    "id",
    "disabled",
    "arrow",
    "isBackButton",
    "backButtonName",
    "backButtonDisabled",
    "backButtonVisible",
    "canSkip"
  ],
  methods: {
    closeModal() {
      this.$refs.closeButton.click();
    }
  },
  mounted() {
    $(`#${this.id}`).on('show.bs.modal', () => {
      this.$emit('show');
    });
    $(`#${this.id}`).on('shown.bs.modal', () => {
      this.$emit('shown');
    });
    $(`#${this.id}`).on('hide.bs.modal', () => {
      this.$emit('hide');
    });
    $(`#${this.id}`).on('hidden.bs.modal', () => {
      this.$emit('hidden');
    });
  }
};
</script>

<style lang="scss" scoped>
.skip {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.skip:hover {
  color: #0000FF;
  cursor: pointer;
}
</style>