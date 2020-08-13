<template>
  <div>
    <a href="#" data-toggle="modal" data-target="#create-group">
      <div class="widget w-build-fav">
        <div class="content text-center">
          <h4 class="title">Create new group</h4>
          <p class="font-weight-bold">NICE AND EASY!</p>
          <button
            class="btn btn-bg-secondary btn-md mt-2"
          >Create now!</button>
        </div>
      </div>
    </a>
    <ModalCreateGroup />
  </div>
</template>

<script>
import ModalCreateGroup from "@/components/atoms/ModalCreateGroup";
export default {
  name: "SNewGroupWidget",
  components: {
    ModalCreateGroup
  }
};
</script>

<style>
</style>