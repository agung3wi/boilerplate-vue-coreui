<template>
  <b-row class="my-1">
    <b-col sm="4" lg="3">
      <label>
        {{ fieldname }}
        <i class="red" v-if="required">*</i>
      </label>
    </b-col>
    <b-col sm="8" lg="9">
      <textarea
        :value="value"
        class="form-control"
        @input="$emit('input', $event.target.value)"
      />
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "TextArea",
  props: {
    fieldname: {
      default: "Form Input",
    },
    value: {
      default: null,
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
