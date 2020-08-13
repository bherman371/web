<template>
  <div class>
    <div class="row">
      <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="ui-block responsive-flex1200">
          <div class="ui-block-title">
            <div class="title">Filter By:</div>
            <div class="w-select">
              <SSelect :content="options" v-model="choice.options" dataCy="searchResultFilter" />
            </div>

            <div class="w-select">
              <SSelect
                v-show="choice.options === 'item'"
                :content="optionsType"
                v-model="choice.itemType"
                dataCy="searchResultFilterItemType"
              />
            </div>

            <div class="w-select">
              <SSelect
                v-show="choice.options === 'group'"
                :content="optionsPrivacy"
                v-model="choice.privacy"
                dataCy="searchResultFilterGroupType"
              />
            </div>

            <button
              href="#"
              data-toggle="modal"
              data-target="#create-photo-album"
              class="btn btn-primary btn-md-2 float-right"
              @click="$emit('button', choice)"
              data-cy="searchFilterSubmit"
            >Filter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SSelect from "@/components/atoms/SSelect";
export default {
  name: "SFilterBar",
  components: {
    SSelect
  },
  model: {
    prop: "input",
    event: "change"
  },
  data() {
    return {
      options: [
        { label: "Choose a filter", value: "" },
        { label: "Item", value: "item" },
        { label: "Group", value: "group" },
        { label: "User", value: "user" }
      ],
      choice: {
        options: "",
        itemType: "",
        privacy: null
      },
      optionsType: [
        { value: "", label: "Choose a item type" },
        { value: 1, label: "Give" },
        { value: 2, label: "Receive" },
        { value: 3, label: "Lend" },
        { value: 4, label: "Borrow" }
      ],
      optionsPrivacy: [
        { value: null, label: "Choose a privacy type" },
        { value: 1, label: "Public" },
        { value: 2, label: "Private" }
      ]
    };
  }
};
</script>

<style>
</style>
