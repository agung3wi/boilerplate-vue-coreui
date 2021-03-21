<template>
  <form @submit.prevent="simpan">
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="username">
          Username
          <i class="red" v-if="mode == 'add'">*</i>
        </label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input
          :readonly="mode != 'add'"
          v-model="input.username"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="name">
          Nama Lengkap
          <i class="red">*</i>
        </label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input v-model="input.name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1" v-if="mode == 'add'">
      <b-col sm="4" lg="3">
        <label for="password">
          Password
          <i class="red">*</i>
        </label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input type="password" v-model="input.password"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="email">Email</label>
      </b-col>
      <b-col sm="8" lg="9">
        <b-form-input v-model="input.email"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="4" lg="3">
        <label for="role_id">Role</label>
      </b-col>
      <b-col sm="8" lg="9">
        <v-select
          placeholder="-- Pilih Role --"
          label="role_name"
          :options="roleList"
          v-model="input.role_id"
          :reduce="(op) => op.id"
        />
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
        <b-button
          v-if="hasPermission('super-admin') && mode == 'edit'"
          type="button"
          variant="primary"
          class="px-4"
          @click="resetPassword()"
          ><i class="fa-fa-refresh"></i> Reset Password</b-button
        >
      </b-col>
    </b-row>
  </form>
</template>

<script>
export default {
  name: "UserInput",
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
  props: ["simpan", "input", "mode"],
};
</script>

<style scoped>
</style>
