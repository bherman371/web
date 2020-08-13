<template>
  <div class="container">
    <div class="row">
      <div class="order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Points area</h6>
          </div>
          <ul class>
            <b-table
              responsive="sm"
              :items="myPoints"
              :fields="fields"
              thead-class="text-white bg-green"
              bordered
              sort-icon-left
              no-sort-reset
              @context-changed="activitySorted"
            >
              <template v-slot:cell(Points)="data">
                <div
                  :class="{'text-success': data.value > 0, 'text-danger': data.value < 0}"
                >{{data.value}}</div>
              </template>
              <template v-slot:cell(Balance)="data">
                <div v-show="activityChanged">{{data.value}}</div>
              </template>
            </b-table>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { TablePlugin } from "bootstrap-vue";
import UserHelperVue from "../../mixins/UserHelper.vue";
import moment from "moment";
Vue.use(TablePlugin);
export default {
  name: "PointsAreaTable",
  mixins: [UserHelperVue],
  props: ["points"],
  data() {
    return {
      fields: [
        {
          key: "Time",
          label: "Activity date",
          formatter: (date) => {
            const dt = new Date(date);
            return moment(dt).format("MM/DD/YYYY"); //hh:mm A
          },
          sortable: true,
        },
        {
          key: "Partner",
          label: "Partner",
          sortable: true,
        },
        {
          key: "Note",
          label: "Activity",
          sortable: true,
        },
        {
          key: "Points",
          label: "Amount",
          sortable: true,
        },
        {
          key: "Balance",
          label: "Balance",
        },
      ],
      activityChanged: false,
    };
  },
  methods: {
    activitySorted(e) {
      if (e.sortBy === "Note") {
        this.activityChanged = true;
      } else {
        this.activityChanged = false;
      }
    },
  },
};
</script>

<style>
</style>