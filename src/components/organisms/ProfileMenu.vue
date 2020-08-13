<template>
  <div
    class="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12 responsive-display-none"
  >
    <div class="ui-block">
      <!-- Your Profile  -->

      <div class="your-profile">
        <div class="ui-block-title ui-block-title-small">
          <h6 class="title">Your PROFILE</h6>
        </div>

        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div class="card">
            <div class="card-header" role="tab" id="headingOne">
              <h6 class="mb-0">
                <a
                  data-toggle="collapse"
                  data-parent="#accordion"
                  href="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Profile settings
                  <svg class="olymp-dropdown-arrow-icon">
                    <use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                  </svg>
                </a>
              </h6>
            </div>

            <div
              id="collapseOne"
              class="collapse show"
              role="tabpanel"
              aria-labelledby="headingOne"
            >
              <ul class="your-profile-menu">
                <li>
                  <a href="#" @click="$emit('change', 'info')">Personal information</a>
                </li>
                <li>
                  <a href="#" @click="$emit('change', 'password')">Change password</a>
                </li>
                 <li>
                  <a href="#" @click="$emit('change', 'email')">Change email</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- ... end Your Profile  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMenu"
};
</script>

<style>
</style>