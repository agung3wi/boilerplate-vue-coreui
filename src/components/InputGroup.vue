<template>
  <b-row class="my-1">
    <b-col sm="4" lg="3">
      <label>
        {{ fieldname }}
        <i class="red" v-if="required">*</i>
      </label>
    </b-col>
    <b-col sm="8" lg="9">
      <slot name="content"></slot>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "InputText",
  props: {
    fieldname: {
      default: "Form Input",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
