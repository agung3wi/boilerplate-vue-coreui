<template>
  <b-row>
    <b-col cols="12">
      <form @submit.prevent="save">
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
            <b-form-input
              type="password"
              v-model="input.password"
            ></b-form-input>
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
          <b-col sm="6" lg="8">
            <v-select
              placeholder="-- Pilih Role --"
              label="role_name"
              :options="roleList"
              v-model="input.role_id"
              :reduce="(op) => op.id"
            />
          </b-col>
          <b-col sm="2" lg="1">
            <b-button :variant="'primary'" @click="addRole"
              ><i class="fa fa-plus"></i
            ></b-button>
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
      <b-modal
        no-close-on-backdrop
        size="lg"
        id="roleForm"
        ref="roleForm"
        title="Form Role"
        hide-footer
      >
        <RoleInput
          :save="saveRole"
          :input="roleInput"
          :mode="'add'"
        ></RoleInput>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import RoleInput from "./RoleInput";
export default {
  name: "UserInput",
  components: {
    RoleInput,
  },
  data: () => {
    return {
      roleInput: {},
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
    addRole() {
      this.$refs.roleForm.show();
    },
    saveRole(e) {
      if (this.mode == "add") {
        this.$http
          .post("/role/add", this.roleInput)
          .then((res) => {
            this.alert.success("Berhasil menambahkan Role");
            this.$refs.roleForm.hide();
            this.input.role_id = res.id;
            this.init();
          })
          .catch((err) => {
            this.alert.error(err.message);
            return;
          });
      } else if (this.mode == "edit") {
        this.$http
          .post("/role/edit", this.roleInput)
          .then((res) => {
            this.alert.success("Berhasil mengubah User");
            this.$refs.modalForm.hide();
            this.get();
          })
          .catch((err) => {
            this.alert.error(err.message);
            e.preventDefault();
            return;
          });
      }
    },
  },
  props: ["save", "input", "mode"],
};
</script>

<style scoped>
</style>
