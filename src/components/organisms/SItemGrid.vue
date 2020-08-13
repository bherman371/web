<template>
  <div>
    <div class="header-spacer--standard"></div>
    <section>
      <div class="container">
        <div class="row">
          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="ui-block responsive-flex1200">
              <div class="ui-block-title">
                <div class="w-select">
                  <div class="title">Filter By:</div>
                  <fieldset class="form-group">
                    <select class="selectpicker form-control">
                      <option value="NU">All Categories</option>
                      <option value="NU">Favourite</option>
                      <option value="NU">Likes</option>
                    </select>
                  </fieldset>
                </div>

                <div class="w-select">
                  <fieldset class="form-group">
                    <select class="selectpicker form-control">
                      <option value="NU">Date (Descending)</option>
                      <option value="NU">Date (Ascending)</option>
                    </select>
                  </fieldset>
                </div>

                <div class="w-select">
                  <fieldset class="form-group">
                    <select class="selectpicker form-control">
                      <option value="AL">All Colors</option>
                      <option value="RE">Red</option>
                      <option value="GR">Green</option>
                      <option value="BL">Blue</option>
                    </select>
                  </fieldset>
                </div>

                <a href="#" class="btn btn-blue btn-md-2">Filter Products</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class>
      <div class="container">
        <div class="row">
          <div
            class="col col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
            v-for="item in items"
            :key="item.id"
          >
            <router-link :to="`/s-app/item-details/${item.Item_id}`">
              <ItemBlock :item="item" />
            </router-link>
          </div>

          <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 align-center pb120 pt120">
            <!-- Pagination -->

            <SPagination />

            <!-- ... end Pagination -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import SPagination from "@/components/atoms/SPagination";
import ItemBlock from "@/components/molecules/ItemBlock";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SItemGrid",
  components: {
    SPagination,
    ItemBlock
  },
  methods: {
    ...mapActions(["getItemSearch"])
  },
  computed: {
    ...mapGetters({
      items: "getItemSearchResults"
    })
  },
  mounted() {
    this.getItemSearch("b");
  }
};
</script>

<style>
</style>