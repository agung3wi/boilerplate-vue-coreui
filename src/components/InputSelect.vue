<template>
  <b-row class="my-1">
    <b-col sm="4" lg="3">
      <label>
        {{ fieldname }}
        <i class="red" v-if="required">*</i>
      </label>
    </b-col>
    <b-col sm="8" lg="9">
      <v-select
        :placeholder="fieldname"
        class="border rounded w-100"
        :value="value ? value.toString() : null"
        :label="selected_text"
        :reduce="(data) => data[selected_value]"
        :options="
          options.map((i) => {
            i[selected_value] = i[selected_value].toString();
            return i;
          })
        "
        @input="$emit('input', $event)"
      />
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "InputText",
  props: {
    label: {
      type: String,
      default: null,
    },
    id: String,
    fieldname: {
      type: String,
      default: "",
    },
    value: {
      default: null,
    },
    selected_text: {
      type: String,
      default: "label",
    },
    selected_value: {
      type: String,
      default: "id",
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: Array,
  },
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
