<template>
  <form @submit.prevent="save">
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="role_code">
          Kode Role
          <i class="red" v-if="mode == 'add'">*</i>
        </label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input
          :readonly="mode != 'add'"
          v-model="input.role_code"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="role_name">
          Nama Role
          <i class="red">*</i>
        </label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input v-model="input.role_name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="role_id">Keterangan</label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-textarea v-model="input.description"></b-form-textarea>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="role_id">&nbsp;</label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-button
          v-if="hasPermission('super-admin') && mode == 'add'"
          type="submit"
          variant="primary"
          class="px-4"
          >Submit</b-button
        >
        <b-button
          v-if="hasPermission('super-admin') && mode == 'edit'"
          type="submit"
          variant="primary"
          class="px-4"
          >Submit</b-button
        >&nbsp;
      </b-col>
    </b-row>
  </form>
</template>

<script>
export default {
  name: "RoleInput",
  data: () => {
    return {
      roleList: [],
    };
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      this.roleList = await this.$http.get("/role").then((res) => res.items);
    },
  },
  props: ["save", "input", "mode"],
};
</script>

<style scoped>
</style>
