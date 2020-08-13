<template>
  <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
    <div class="ui-block">
      <div class="friend-item fav-page">
        <div class="friend-header-thumb">
          <img src="/img/fav1.jpg" alt="friend" />
        </div>

        <div class="friend-item-content">
          <div class="friend-avatar">
            <div class="author-thumb">
              <img src="/img/avatar9.jpg" alt="author" />
            </div>
            <div class="author-content">
              <a href="#" class="h5 author-name">Green Goo Rock</a>
            </div>
          </div>

          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="friend-count" data-swiper-parallax="-500">
                  <a href="#" class="friend-count-item">
                    <div class="h6">48</div>
                    <div class="title">Members</div>
                  </a>
                  <a href="#" class="friend-count-item">
                    <div class="h6">5630</div>
                    <div class="title">Items</div>
                  </a>
                </div>
                <div class="control-block-button" data-swiper-parallax="-100">
                  <a href="#" class="btn btn-control bg-primary">
                    <svg class="olymp-star-icon">
                      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-star-icon" />
                    </svg>
                  </a>

                  <a href="#" class="btn btn-control bg-purple">
                    <svg class="olymp-chat---messages-icon">
                      <use xlink:href="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                    </svg>
                  </a>
                </div>
              </div>

              <div class="swiper-slide">
                <p
                  class="friend-about"
                  data-swiper-parallax="-500"
                >We are Rock Band from Los Angeles, now based in San Francisco, come and listen to us play!</p>

                <div class="friend-since" data-swiper-parallax="-100">
                  <div>Website:</div>
                  <a href="#" class="h6">www.ggrock.com</a>
                </div>
              </div>
            </div>

            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupCardBox"
};
</script>

<style>
</style>