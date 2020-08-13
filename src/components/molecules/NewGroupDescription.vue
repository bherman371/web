<template>
  <div>
    <SInput placeholder="Group name" v-model="title" type="input" otherClasses="mb-0"/>
    <TextArea placeholder="Group description" v-model="description" />
  </div>
</template>

<script>
import SInput from "@/components/atoms/SInput";
import TextArea from "@/components/atoms/TextArea";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NewGroupDescription",
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
    ...mapActions(["setNewGroupDescription", "setNewGroupTitle"]),
    storeDescription() {
      if(this.groupDescription !== this.description)this.setNewGroupDescription(this.description);
      if(this.groupTitle !== this.title)this.setNewGroupTitle(this.title);
    }
  },
  computed: {
    ...mapGetters({
      groupTitle: "getNewGroupTitle",
      groupDescription: "getNewGroupDescription"
    })
  },
  mounted() {
    if (this.groupTitle && this.groupDescription) {
      this.description = this.groupDescription;
      this.title = this.groupTitle;
    }
  }
};
</script>

<style>
</style>