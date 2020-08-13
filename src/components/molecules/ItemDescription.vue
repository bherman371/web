<template>
  <div>
    <SInput placeholder="Title" v-model="title" type="input" otherClasses="mb-0" />
    <TextArea placeholder="Description" v-model="description" />
  </div>
</template>

<script>
import SInput from "@/components/atoms/SInput";
import TextArea from "@/components/atoms/TextArea";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ItemDescription",
  components: {
    SInput,
    TextArea
  },
  data() {
    return {
      title: null,
      description: null
    };
  },
  methods: {
    ...mapActions(["setNewItemDescription", "setNewItemTitle"]),
    storeDescription() {
      if(this.itemDescription !== this.description)this.setNewItemDescription(this.description);
      if(this.itemTitle !== this.title)this.setNewItemTitle(this.title);
    }
  },
  computed: {
    ...mapGetters({
      itemTitle: "getNewItemTitle",
      itemDescription: "getNewItemDescription"
    })
  },
  mounted() {
    if (this.itemTitle && this.itemDescription) {
      this.description = this.itemDescription;
      this.title = this.itemTitle;
    }
  }
};
</script>

<style>
</style>