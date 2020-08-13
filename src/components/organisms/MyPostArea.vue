<template>
  <div>
    <div class="header-spacer header-spacer-small"></div>
    <HeaderMyPostArea />
    <PublishedItems />
  </div>
</template>

<script>
import PublishedItems from "@/components/molecules/PublishedItems";
import HeaderMyPostArea from "@/components/atoms/HeaderMyPostArea";
export default {
  name: "MyPostArea",
  components: {
    PublishedItems,
    HeaderMyPostArea
  }
};
</script>

<style>
</style>