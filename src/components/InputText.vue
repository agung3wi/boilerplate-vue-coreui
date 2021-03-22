<template>
  <b-row class="my-1">
    <b-col sm="4" lg="3">
      <label>
        {{ fieldname }}
        <i class="red" v-if="required">*</i>
      </label>
    </b-col>
    <b-col sm="8" lg="9">
      <input
        :value="value"
        :type="type"
        class="form-control"
        @input="$emit('input', $event.target.value)"
      />
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
    value: {
      default: null,
    },
    type: {
      default: "text",
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
