<script>
import { mapActions, mapGetters } from "vuex";
import Global from "@/constants/Global.js";
import moment from "moment";
export default {
  methods: {
    ...mapActions([
      "fetchItemProfile",
      "fetchItemMessages",
      "postItemMessage",
      "fetchUserInventory",
      "fetchItemRequestMade",
      "fetchItemRequestReceived",
      "acceptItemRequest",
      "declineItemRequest",
    ]),
    getItemImagePath(item) {
      return `${Global.getServerDomain()}/images/item/${item.id}.jpg`;
    },
    getItemValue(item) {
      if (item.cash === 0 && item.points === 0) {
        return '<span class="free-price">FREE</span>';
      } else if (item.cash === 0) {
        return `<span class="points-price">${item.points}</span>`;
      } else if (item.points === 0) {
        return `<span class="cash-price">${item.cash}</span>`;
      } else {
        return `<span class="cash-price">${item.cash}</span>|<span class="points-price">${item.points}</span>`;
      }
    },
    getItemCategory(item) {
      if (item.type === 1) {
        return "<div>GIVE</div>";
      } else if (item.type === 2) {
        return "<div>RECEIVE</div>";
      } else if (item.type === 3) {
        return "<div>LEND</div>";
      } else {
        return "<div>BORROW</div>";
      }
    },
    getItemDescription(item) {
      return item.description;
    },
    getItemTitle(item) {
      return `${item.title}`;
    },
    getPosterName(item) {
      if (item.user.firstname) {
        return `${item.user.firstName}`;
      } else {
        return `${item.user.username}`;
      }
    },
    getItemCondition(item) {
      if (item.condition === 1) {
        return "<span>NEW</span>";
      } else if (item.condition === 2) {
        return "<span>LIKE NEW</span>";
      } else if (item.condition === 3) {
        return "<span>USED</span>";
      } else {
        return "<span>WORN</span>";
      }
    },
  },
  computed: {
    ...mapGetters({
      itemProfile: "getItemProfile",
      itemPostFeaturedImage: "getNewItemImage",
      imageFile: "getImageFile",
      itemRequestsReceived: "getItemRequestsReceived",
      userInventory: "getUserInventory",
    }),
  },
  filters: {
    date(date) {
      if (!date) return "";
      const dt = new Date(date);
      const f = (d) => (d < 10 ? "0" + d : d);
      return (
        f(dt.getMonth() + 1) + "/" + f(dt.getDate()) + "/" + dt.getFullYear()
      );
    },
    relativeDate(date) {
      if (!date) return "";

      const dt = moment(date);
      moment.updateLocale("en", {
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
      });

      return dt.fromNow();
    },
  },
};
</script>
