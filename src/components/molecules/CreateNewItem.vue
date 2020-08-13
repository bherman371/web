<template>
  <div class="container">
    <div class="row">
      <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="album-page" role="tabpanel">
            <div class="photo-album-wrapper">
              <div class="photo-album-item-wrap col-4-width">
                <div class="photo-album-item create-album" data-mh="album-item">
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#create-photo-album"
                    class="full-block"
                  ></a>

                  <div class="content">
                    <a
                      href="#"
                      class="btn btn-control bg-primary"
                      data-toggle="modal"
                      data-target="#create-photo-album"
                    >
                      <svg class="olymp-plus-icon">
                        <use xlink:href="/svg-icons/sprites/icons.svg#olymp-plus-icon" />
                      </svg>
                    </a>

                    <a
                      href="#"
                      class="title h5"
                      data-toggle="modal"
                      data-target="#create-photo-album"
                    >Create New Item</a>
                    <span class="sub-title">It only takes a few minutes!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateNewItem"
};
</script>

<style>
</style>