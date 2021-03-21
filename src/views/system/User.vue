<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-row>
            <b-col cols="6" xl="3">
              <b-form-group>
                <b-input-group>
                  <b-form-input
                    type="text"
                    placeholder="Cari ..."
                    v-model="filter.src"
                    @change="get()"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="4" xl="4">
              <b-form-group>
                <b-input-group
                  ><v-select
                    placeholder="-- Status Aktif --"
                    class="w-100"
                    label="label"
                    @input="get()"
                    :options="yesNoList"
                    v-model="filter.active"
                    :reduce="(op) => op.id"
                  ></v-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="6" xl="3">
              <b-button v-if="hasPermission('super-admin')" @click="get()"
                ><i class="fa fa-search"></i></b-button
              >&nbsp;
              <b-button
                variant="primary"
                v-if="hasPermission('super-admin')"
                @click="add()"
                >Tambah Pengguna</b-button
              >
            </b-col>
          </b-row>
          <br />
          <template v-if="items.length > 0">
            <b-row>
              <b-col cols="3">
                <b-row class="my-1">
                  <b-col sm="6" lg="6">
                    <label for="password"> Per Halaman </label>
                  </b-col>
                  <b-col sm="6" lg="6">
                    <b-form-select
                      v-model="filter.limit"
                      @change="get()"
                      :options="[20, 50, 100, 1000]"
                    ></b-form-select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" xl="12">
                <b-table
                  :hover="hover"
                  :striped="striped"
                  :bordered="bordered"
                  :small="small"
                  :fixed="fixed"
                  responsive="lg"
                  :items="items"
                  :fields="fields"
                >
                  <template slot="action" slot-scope="data">
                    <b-badge class="pointer" @click="edit(data.item.id)"
                      >Lihat Detail</b-badge
                    >
                  </template>
                  <template slot="active" slot-scope="data">
                    <b-badge
                      class="pointer"
                      variant="success"
                      v-if="data.item.active == 'Y'"
                      @click="toggleActive(data.item)"
                      >Aktif</b-badge
                    >
                    <b-badge
                      class="pointer"
                      variant="danger"
                      v-else
                      @click="toggleActive(data.item)"
                      >Tidak Aktif</b-badge
                    >
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4" xl="4" lg="4">
                Ditampilkan {{ (filter.page - 1) * filter.limit + 1 }} sampai
                {{ (filter.page - 1) * filter.limit + items.length }} dari
                {{ total }}
              </b-col>
              <b-col cols="8" xl="8">
                <nav class="pull-right">
                  <b-pagination
                    @change="get()"
                    size="md"
                    :total-rows="total"
                    :per-page="filter.limit"
                    v-model="filter.page"
                    prev-text="Prev"
                    next-text="Next"
                    hide-goto-end-buttons
                  />
                </nav>
              </b-col>
            </b-row>
          </template>
          <template v-else>
            <b-this.alert show
              >Belum ada data, silakan klik Tambah Pengguna untuk menambahkan
              data</b-this.alert
            >
          </template>
        </b-card>
      </transition>
      <b-modal
        no-close-on-backdrop
        size="lg"
        id="userForm"
        ref="userForm"
        title="Form User"
        hide-footer
      >
        <UserInput :simpan="save" :input="input" :mode="mode"></UserInput>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import UserInput from "./UserInput";

export default {
  name: "User",
  components: {
    UserInput,
  },
  props: {
    caption: {
      type: String,
      default: "Data Pengguna",
    },
    hover: {
      type: Boolean,
      default: true,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      mode: "add",
      items: [],
      input: {},
      filter: {
        limit: 20,
        page: 1,
        branch_id: null,
      },
      fields: [
        {
          key: "action",
          label: "Action",
        },
        {
          key: "username",
          label: "Username",
          sortable: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
        },
        {
          key: "name",
          label: "Full Name",
          sortable: true,
        },
        {
          key: "active",
          label: "Active",
          sortable: true,
        },
        {
          key: "role_name",
          label: "Role",
          sortable: true,
        },
      ],
      submitted: false,
      total: 0,
    };
  },
  async created() {
    this.get();
  },
  methods: {
    async init() {
      this.roleList = await this.$http.get("/role").then((res) => res.items);
    },
    get() {
      this.$http.get("/user", this.filter).then((res) => {
        this.items = res.items;
        this.total = res.total;
      });
    },
    rowClicked() {},
    async toggleActive(item) {
      const message =
        item.active == "Y"
          ? "Apakah anda akan menonkatifkan User ini?"
          : "Apakah anda akan mengaktifkan User ini?";

      const messageConfirmed =
        item.active == "Y"
          ? "Berhasil menonkatifkan User ini."
          : "Berhasil mengaktifkan User ini.";
      let confirm = await this.alert.confirm(message).catch((err) => {
        return false;
      });
      if (confirm) {
        if (item.active == "Y")
          await this.$http.post("/user/remove", { id: item.id });
        else await this.$http.post("/user/restore", { id: item.id });

        this.alert.success(messageConfirmed);
        this.get();
      }
    },
    add() {
      this.mode = "add";
      this.submitted = false;
      this.input = {};
      this.$refs.userForm.show();
    },
    save(e) {
      if (this.mode == "add") {
        this.$http
          .post("/user/add", this.input)
          .then((res) => {
            this.alert.success("Berhasil menambahkan User");
            this.$refs.userForm.hide();
            this.get();
          })
          .catch((err) => {
            this.alert.error(err.message);
            return;
          });
      } else if (this.mode == "edit") {
        this.$http
          .post("/user/edit", this.input)
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
    async edit(id) {
      this.input = await this.$http.get("/user/find", { id: id });
      this.mode = "edit";
      this.submitted = false;
      this.$refs.userForm.show();
    },
    resetPassword() {
      let input = this.input;
      this.$http
        .post("/reset-password", input)
        .then((res) => {
          this.alert.success(res.message);
        })
        .catch((err) => {
          this.alert.error(err.message);
        });
    },
  },
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
