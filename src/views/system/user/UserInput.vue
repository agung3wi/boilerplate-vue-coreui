<template>
  <b-row>
    <b-col cols="12">
      <form @submit.prevent="save">
        <input-text
          :required="true"
          :fieldname="'Username'"
          v-model="input.username"
        />
        <input-text
          :required="true"
          :fieldname="'Nama Lengkap'"
          v-model="input.name"
        />
        <input-text
          :required="true"
          :fieldname="'Email'"
          v-model="input.email"
        />
        <input-text
          :required="true"
          type="password"
          :fieldname="'Password'"
          v-model="input.password"
        />
        <!-- <input-select
          selected_text="role_name"
          selected_value="id"
          fieldname="Role"
          v-model="input.role_id"
          :options="roleList"
        /> -->
        <input-group :fieldname="'Role'">
          <template v-slot:content>
            <b-row>
              <b-col cols="9">
                <v-select
                  :options="roleList"
                  label="role_name"
                  :reduce="(data) => data.id"
                  v-model="input.role_id"
                ></v-select>
              </b-col>
              <b-col cols="3">
                <b-button variant="primary" @click="addRole">+</b-button>
              </b-col>
            </b-row>
          </template>
        </input-group>
        <submit-button />
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
import InputGroup from "../../../components/InputGroup.vue";
import RoleInput from "../role/RoleInput";
export default {
  name: "UserInput",
  components: {
    RoleInput,
    InputGroup,
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
