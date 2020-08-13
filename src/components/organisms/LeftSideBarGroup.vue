<template>
  <div>
    <GroupIntro :group="group"/>
    <MembersHolder/>
  </div>
</template>
<script>
import GroupIntro from "@/components/molecules/GroupIntro"
import MembersHolder from "@/components/molecules/MembersHolder"

export default {
  name: "LeftSideBarGroup",
  props: [
    "group"
  ],
  components: {
    GroupIntro,
    MembersHolder
  },
  mounted() {
    console.log(this.group)
  }
}
</script>
