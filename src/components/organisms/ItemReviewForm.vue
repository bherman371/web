<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="ui-block">
            <div class="ui-block-content">
              <div class="row">
                <slot />
                <SButton
                  text="Save"
                  color="blue"
                  size="lg"
                  class="w-75 mx-auto mt-2"
                  @button="$emit('button')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SButton from "@/components/atoms/SButton";
export default {
  name: "ItemReviewForm",
  components: {
    SButton
  }
};
</script>

<style>
</style>