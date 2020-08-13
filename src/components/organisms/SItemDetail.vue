<template>
  <div class="body-bg-white">
    <section style="padding-top: 100px">
      <!-- Shop Product Detail -->

      <div class="shop-product-detail">
        <div class="container">
          <div class="row">
            <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="thumbs-wrap" style="height: 500px; width: 625px;">
                <div
                  class="small-thumbs-wrap js-zoom-gallery"
                  v-for="small in smallPictures"
                  :key="small.id"
                >
                  <a :href="small.picture" class="small-thumb">
                    <img :src="small.picture" alt="product" />
                  </a>
                </div>
                <div class="shop-product-detail-thumb">
                  <img class="main-img" alt="product" :src="getItemImagePath(itemProfile)" />
                </div>
              </div>
            </div>
            <div class="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div class="shop-product-detail-content">
                <div class="main-content-wrap">
                  <div class="block-title">
                    <a href="#" class="product-category" v-html="getItemCategory(itemProfile)"></a>
                    <h2 class="title bold">{{itemProfile.title}}</h2>
                  </div>

                  <div class="block-price">
                    <div class="product-price" v-html="getItemValue(itemProfile)"></div>
                  </div>
                </div>

                <p>{{itemProfile.description}}</p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ... end Shop Product Detail -->
    </section>

    <section class="medium-padding120 mt-5">
      <div class="container">
        <div class="row">
          <div class="col col-xl-8 m-auto col-lg-8 col-md-12 col-sm-12 col-12">
            <!-- Product Description -->

            <div class="product-description">
              <!-- Nav tabs -->
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#additional"
                    role="tab"
                  >Additional Description</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#rewievs" role="tab">
                    Customer Reviews
                    <span class="total-topic">{{itemMessages.length}}</span>
                  </a>
                </li>
              </ul>

              <!-- Tab panes -->
              <div class="tab-content">
                <div
                  class="tab-pane active align-center"
                  id="additional"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                  <h2 class="title">{{itemProfile.name}}</h2>
                  <p>{{itemProfile.description}}</p>
                </div>

                <div class="tab-pane" id="rewievs" role="tabpanel" data-mh="log-tab">
                  <div class="comments-title-wrap">
                    <div class="block-title">
                      <h2 class="title">{{itemMessages.length}} Reviews</h2>
                    </div>

                    <a
                      href="#"
                      class="btn btn-primary btn-md"
                      data-toggle="modal"
                      data-target="#popup-write-review"
                    >Write a Review</a>
                  </div>

                  <ItemReviewsComments :comments="messages"/>
                  <ModaItemPostComment id="popup-write-review" :user="currentUser"/>
                </div>
              </div>
            </div>

            <ModalTradeItem v-if="isItemAvailable && isUserAuthenticated" :item="itemProfile" />

            <!-- ... end Product Description -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ItemHelper from "@/mixins/ItemHelper";
import ItemReviewsComments from "@/components/molecules/ItemReviewsComments";
import ModaItemPostComment from "@/components/organisms/ModaItemPostComment";
import ModalTradeItem from '../molecules/ModalTradeItem.vue';

import { mapGetters } from "vuex";

export default {
  name: "SItemDetail",
  props: ["category", "title", "smallPictures"],
  mixins: [ItemHelper],
  components: {
    ModalTradeItem,
    ItemReviewsComments,
    ModaItemPostComment
  },
  methods: {
    openTradeModal() {
      // Due to the way promises are implemented, it wasn't possible to use await
      if (this.isUserAuthenticated && this.isItemAvailable) {
        $(`#trade-item-${this.itemProfile.id}`).modal('show');
      } else {
        setTimeout(this.openTradeModal, 250);
      }
    }
  },
  computed: {
    ...mapGetters({
      itemMessages: "getItemMessages",
      isUserAuthenticated: "isUserAuthenticated",
      currentUser: "getUser"
    }),
    messages(){
      if(this.itemMessages){
        let arr = this.itemMessages.slice().reverse()
        return arr
      }else{
        return []
      }
    },
    isItemAvailable() {
      return this.itemProfile && this.itemProfile.id;
    }
  },
  async created() {
    this.fetchItemMessages(this.$route.params.id);
    await this.fetchItemProfile(this.$route.params.id);

    if (this.$route.query.sendTradeMessage) {
      $(() => {
        this.openTradeModal();
      });
    }
  }
};
</script>

<style>
</style>