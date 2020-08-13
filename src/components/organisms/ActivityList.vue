<template>
  <!-- Main Content -->

  <div id="newsfeed-items-grid">
    <div v-for="activity in activities" v-bind:key="activity._id">
      <SNewGroupMessage :message="activity" v-if="activity.feedType === 'GROUP_MESSAGE'" />
      <SNewItem :item="activity" v-if="activity.feedType === 'NEW_ITEM'" />
      <SNewMember :member="activity" v-if="activity.feedType === 'NEW_MEMBER'" />
    </div>
  </div>

  <!-- ... end Main Content -->

  <!-- Left Sidebar -->
</template>

<script>
import SNewItem from "@/components/organisms/SNewItem";
import SNewMember from "@/components/organisms/SNewMember";
import SNewGroupMessage from "@/components/organisms/SNewGroupMessage";

export default {
  name: "ActivityList",
  props: ["activities"],
  components: {
    SNewGroupMessage,
    SNewItem,
    SNewMember
  }
};
</script>

<style>
</style>
