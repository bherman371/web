<template>
  <div>
    <div class="header-spacer header-spacer-small"></div>
    <HeaderAdminArea />
    <div class="container">
      <div class="row">
        <div class="order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Friend requests</h6>
            </div>

            <!-- Notification List Frien Requests -->

            <ul class="notification-list friend-requests">
              <li class="un-read">
                <div></div>
                <div class="notification-event">
                  <Sinput v-model="text" size="lg"/>
                </div>
              </li>
            </ul>

            <!-- ... end Notification List Frien Requests -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sinput from "@/components/atoms/SInput";
import HeaderAdminArea from "@/components/molecules/HeaderAdminArea";
export default {
  name: "AdministrationPage",
  components: {
    HeaderAdminArea,
    Sinput
  },
  data(){
    return{
      text:"blah blah ble ble ble bliu ble ble bliuble ble bliuble ble bliuble ble bliu"
    }
  }
};
</script>

<style>
</style>