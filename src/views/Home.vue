<template>
  <div class="page-has-left-panels page-has-right-panels">
    <div class="container">
      <div class="row">
        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Button Versions</h6>
            </div>
            <div class="ui-block-content">
              <div class="row">
                <SButton :text="'TESTE'" :color="'breez-light'" :size="'lg'"></SButton>
              </div>
            </div>
          </div>

          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Form Elements</h6>
            </div>
            <div class="ui-block-content">
              <div class="row">
                <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb30">
                  <SInput
                    :label="'Default'"
                    :success="false"
                    :icon="'fab fa-facebook-f c-facebook'"
                  ></SInput>
                  <SSelect
                    :label="'Dropdown'"
                    :items="[{value: 0, label: 't1'},{value:1, label:'t2'}]"
                  ></SSelect>
                  <SDatePicker></SDatePicker>
                  <SSwitch></SSwitch>

                  <SCheckbox
                    label="TE"
                    :disabled="true"
                  />
                  <STooltip position="top" title="Tooltip">
                    <SRadio label="TA" checked="false"></SRadio>
                  </STooltip>
                  <SPopover position="top" content="Popover">
                    <SRadio label="TA" checked="false"></SRadio>
                  </SPopover>
                  <SRangeSlider color="blue"></SRangeSlider>
                  <SUploadButton label="UPLOAD" color="breez"></SUploadButton>
                  <SQuantityInput color="blue" min="4" max="10"></SQuantityInput>
                </div>
              </div>
            </div>
          </div>

          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Forms Validated</h6>
            </div>
            <div class="ui-block-content">
              <form class="needs-validation" novalidate>
                <div class="crumina-module crumina-heading with-title-decoration">
                  <h5 class="heading-title">Form</h5>
                </div>

                <div class="row">
                  <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Your Address</label>
                      <input class="form-control" type="text" placeholder required />
                      <span class="invalid-feedback">
                        <span class="error-box">Your Address is required</span>
                      </span>
                    </div>

                    <div class="form-group label-floating">
                      <label class="control-label">Apartment Number / Suite</label>
                      <input class="form-control" type="text" placeholder required />
                      <span class="invalid-feedback">
                        <span class="error-box">Apartment Number / Suite is required</span>
                      </span>
                    </div>

                    <div class="checkbox">
                      <label>
                        <input type="checkbox" name="optionsCheckboxes" required />
                        Ship to a different address
                        <span
                          class="invalid-feedback"
                        >
                          <span class="error-box">Different address is required</span>
                        </span>
                      </label>
                    </div>

                    <button class="btn btn-md btn-primary" type="submit">Submit form</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SButton from "@/components/atoms/SButton.vue";
import SInput from "@/components/atoms/SInput.vue";
import SSelect from "@/components/atoms/SSelect.vue";
import SDatePicker from "@/components/atoms/SDatePicker.vue";
import SSwitch from "@/components/atoms/SSwitch.vue";
import SCheckbox from "@/components/atoms/SCheckbox.vue";
import SRadio from "@/components/atoms/SRadio.vue";
import STooltip from "@/components/atoms/STooltip.vue";
import SPopover from "@/components/atoms/SPopover.vue";
import SRangeSlider from "@/components/atoms/SRangeSlider.vue";
import SUploadButton from "@/components/atoms/SUploadButton.vue";
import SQuantityInput from "@/components/atoms/SQuantityInput.vue";
// @ is an alias to /src

export default {
  name: "home",
  components: {
    SButton,
    SInput,
    SSelect,
    SDatePicker,
    SSwitch,
    SCheckbox,
    SRadio,
    STooltip,
    SPopover,
    SRangeSlider,
    SUploadButton,
    SQuantityInput
  }
};
</script>
