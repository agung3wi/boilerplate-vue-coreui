<template>
  <b-row class="my-1">
    <b-col sm="4" lg="3">
      <label for="role_id">&nbsp;</label>
    </b-col>
    <b-col sm="8" lg="9">
      <b-button type="submit" variant="primary" class="px-4">{{
        label
      }}</b-button>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "SubmitButton",
  props: {
    label: {
      default: "Submit",
    },
  },
};
</script>
<style scoped>
.red {
  color: red;
}
</style>
