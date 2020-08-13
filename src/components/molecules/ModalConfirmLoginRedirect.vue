<template>
  <div>
    <div id="confirm-login-redirect" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <svg class="olymp-close-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-close-icon" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <p class="lead text-center mb-4">You need to register or log in to continue</p>
            <p class="text-center mb-0">
              <button type="button" class="btn btn-primary px-4 py-2" @click="continueLogin()">
                Continue to login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirmLoginRedirect",
  methods: {
    continueLogin() {
      $("#confirm-login-redirect").modal("hide");
      this.$emit('button');
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-header {
  border-bottom: none;
  padding: 1em;

  .close {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
