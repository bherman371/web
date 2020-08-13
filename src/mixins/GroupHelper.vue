<script>
import { mapActions, mapGetters } from "vuex";
import Global from '@/constants/Global.js'
export default {
  methods: {
    ...mapActions([
      "getMyGroups",
      "getAllGroups",
      "getGroupSearch",
      "fetchGroup",
      "fetchMembers",
      "fetchItems",
      "fetchMessages",
      "setNewGroupMembers",
      "inviteMember",
      "createNewGroup",
      "resetNewGroup",
      "joinGroup"
    ]),
    getGroupImagePath(group) {
      return `${Global.getServerDomain()}/images/group/${group.id}.jpg`;
    },
    getGroupName(group) {
      return `${group.name} `;
    }
  },
  computed: {
    ...mapGetters({
      getCurrentGroup: "getCurrentGroup",
      getCurrentGroupMembers: "getCurrentGroupMembers",
      getCurrentGroupTimeline: "getCurrentGroupTimeline",
      getCurrentGroupItems: "getCurrentGroupItems",
      getCurrentGroupMessages: "getCurrentGroupMessages",
      getNewGroupMembers: "getNewGroupMembers",
      newGroup: "getNewGroup",
      newGroupId: "getCreateNewGroupResponse"
    })
  }
};
</script>
