<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import Global from "@/constants/Global.js";
export default {
  methods: {
    ...mapActions([
      "fetchUserProfile",
      "postUserMessage",
      "fetchProfileItems",
      "fetchProfileGroups",
      "passwordForgot",
      "forgotUsername",
      "resetResponse",
      "acceptJoinInvitation",
      "acceptModeratorInvitation",
      "rejectModeratorInvitation",
      "cancelJoinRequest",
      "acceptMember",
      "declineJoinInvitation",
      "fetchMyJoinRequests",
      "fetchMyInvitations",
      "fetchModeratorInvitationsData",
      "acceptJoinInvitation",
      "acceptModeratorInvitation",
      "declineJoinInvitation",
      "rejectModeratorInvitation",
      "uploadHeaderPhoto",
      "emailUpdate",
      "searchAPI",
      "fetchMyPoints",
      "fetchMyPointSum",
    ]),
    getUserImagePath(user) {
      if (user.id)
        return `${Global.getServerDomain()}/images/user/${user.id}.jpg`;
      return `${Global.getServerDomain()}/images/user/2.jpg`;
    },
    getUserName(user) {
      if (user.firstName) {
        return `${user.firstName}`;
      } else {
        return `${user.username}`;
      }
    },
    getRequestDescription(request) {
      return `${request.group.description}`;
    },
    getRequestTitle(request) {
      return `${request.group.name}`;
    },
    getUserHeaderProfileImg(id) {
      return `${Global.getServerDomain()}/images/user/header/${id}`;
    },
  },
  computed: {
    ...mapGetters({
      user: "getUserProfile",
      profileTimeline: "getProfileTimeline",
      response: "getRequestResponse",
      loggedUser: "getUser",
      headerPhoto: "getHeaderUserPhoto",
      searchResult: "getSearchResult",
      userItems: "getProfileItems",
      myPoints: "getMyPoints",
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
