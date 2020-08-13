<template>
  <div class="header--standard header--standard-landing" id="header--standard">
    <div class="container">
      <div class="header--standard-wrap">
        <SLogo class="py-3" />
        <div class="nav nav-pills nav1 header-menu">
          <div class="mCustomScrollbar">
            <ul>
              <li class="menu-search-item">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SLogo from "@/components/atoms/SLogo.vue";

export default {
  name: "SLandingPageBar",
  components: {
    SLogo
  }
};
</script>

