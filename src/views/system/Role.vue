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
            <b-col cols="6" xl="3">
              <b-button v-if="hasPermission('super-admin')" @click="get()"
                ><i class="fa fa-search"></i></b-button
              >&nbsp;
              <b-button
                variant="primary"
                v-if="hasPermission('super-admin')"
                @click="add()"
                >Tambah Role</b-button
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
            <b-alert show>Tidak ditemukan Data Role</b-alert>
          </template>
        </b-card>
      </transition>
      <b-modal
        no-close-on-backdrop
        size="lg"
        id="roleForm"
        ref="roleForm"
        title="Form Role"
        hide-footer
      >
        <RoleInput :save="save" :input="input" :mode="mode"></RoleInput>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import RoleInput from "./RoleInput";

export default {
  name: "Role",
  components: {
    RoleInput,
  },
  props: {
    caption: {
      type: String,
      default: "Daftar Role",
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
          key: "role_code",
          label: "Kode Role",
          sortable: true,
        },
        {
          key: "role_name",
          label: "Nama Role",
          sortable: true,
        },
        {
          key: "description",
          label: "Keterangan",
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
    async init() {},
    get() {
      this.$http.get("/role", this.filter).then((res) => {
        this.items = res.items;
        this.total = res.total;
      });
    },
    rowClicked() {},

    add() {
      this.mode = "add";
      this.submitted = false;
      this.input = {};
      this.$refs.roleForm.show();
    },
    save(e) {
      if (this.mode == "add") {
        this.$http
          .post("/role/add", this.input)
          .then((res) => {
            this.alert.success("Berhasil menambahkan Role");
            this.$refs.roleForm.hide();
            this.get();
          })
          .catch((err) => {
            this.alert.error(err.message);
            return;
          });
      } else if (this.mode == "edit") {
        this.$http
          .post("/role/edit", this.input)
          .then((res) => {
            this.alert.success("Berhasil mengubah Role");
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
      this.input = await this.$http.get("/role/find", { id: id });
      this.mode = "edit";
      this.submitted = false;
      this.$refs.roleForm.show();
    },
  },
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
