<template>
<div>
  <LastPhoto/>
  <FavouriteGroups/>
</div>
</template>

<script>
import LastPhoto from "@/components/molecules/LastPhoto"
import FavouriteGroups from "@/components/molecules/FavouriteGroups"
export default {
  name: "RightSideBarProfile",
  components: {
    LastPhoto,
    FavouriteGroups
  }
};
</script>

<style>
</style>