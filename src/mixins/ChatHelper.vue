
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import Global from "@/constants/Global.js";

export default {
  data() {
    return {
      emojis: [
        0x1f632,
        0x1f61c,
        0x1f604,
        0x1f628,
        0x1f62d,
        0x1f614,
        0x1f621,
        0x1f62a,
        0x1f637,
        0x1f625,
        0x1f60a,
        0x1f608,
        0x1f9df,
        0x1f606,
        0x1f631,
        0x1f609,
        0x1f62b,
        0x1f633,
        0x1f60e,
        0x1f910,
        0x1f47d,
        0x1f913,
        0x1f612,
        0x1f44d,
        0x1f601,
        0x1f60a,
      ],
    };
  },
  methods: {
    ...mapActions([
      "fetchUserMessages",
      "setNewMsgsCounter",
      "setPopupChat",
      "sendAttachment",
      "fetchAttachment",
    ]),
    getLastMsg(messages) {
      const l = messages.length;
      return `${messages[l - 1].msg}`;
    },
    getLastMsgTimeStamp(messages) {
      const l = messages.length;
      return `${messages[l - 1].createdAt}`;
    },
    getSenderImgPath(user) {
      return `${Global.getServerDomain()}/images/user/${user.senderId}.jpg`;
    },
    getReceiverImgPath(user) {
      return `${Global.getServerDomain()}/images/user/${user.receiverId}.jpg`;
    },
    getLastSenderMsg(messages) {
      let arr = [];
      arr = messages.filter((item) => {
        return item.senderId !== this.loggedUser.id;
      });
      return arr[arr.length - 1].msg;
    },

    getNewestMsgFromSender(msg) {
      if (msg[msg.length - 1].senderId !== this.loggedUser.id) {
        return true;
      }
      return false;
    },
    getSenderName(msg, user) {
      if (msg.senderId === this.loggedUser.id) {
        if (this.loggedUser.firstName) {
          return `${this.loggedUser.firstName}`;
        } else {
          return `${this.loggedUser.username}`;
        }
      } else {
        if (user.firstName) {
          return `${user.firstName}`;
        } else {
          return `${user.username}`;
        }
      }
    },
    getChatUsername(usr) {
      if (usr.firstName) {
        return usr.firstName;
      } else if (usr.username) {
        return usr.username;
      }
      return usr;
    },
    getAllMsgs(usr) {
      if (usr.messages) return usr.messages;
      return [];
    },
  },
  computed: {
    ...mapGetters({
      loggedUser: "getUser",
      userMessages: "getUserMessages",
      stateWindow: "getStateWindowChat",
      chatMessages: "getWindowChatMsgs",
    }),
    filteredResults() {
      if (!this.filter) return this.userMessages;
      let pattern = new RegExp(this.filter.toLowerCase());
      let result = this.userMessages.filter((item) => {
        if (item.firstName) var firstname = item.firstName.toLowerCase();
        if (item.username) var username = item.username.toLowerCase();
        return pattern.exec(firstname) || pattern.exec(username);
      });
      return result;
    },
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
