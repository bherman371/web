<template>
  <div>
    <a
      href="#"
      data-toggle="modal"
      data-target="#update-header-photo"
      class="btn btn-md-2 btn-border-think custom-color c-grey"
    >Add Photos</a>

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
            <h6 class="title">Update Header Photo</h6>
          </div>

          <div class="modal-body">
            <a href="#" class="upload-photo-item">
              <svg class="olymp-computer-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-computer-icon" />
              </svg>

              <h6>Upload Photo</h6>
              <span>Browse your computer.</span>
            </a>

            <a
              href="#"
              class="upload-photo-item"
              data-toggle="modal"
              data-target="#choose-from-my-photo"
            >
              <svg class="olymp-photos-icon">
                <use xlink:href="/svg-icons/sprites/icons.svg#olymp-photos-icon" />
              </svg>

              <h6>Choose from My Photos</h6>
              <span>Choose from your uploaded photos</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadPhotos"
};
</script>

<style>
</style>