<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-row>
            <b-col cols="12" xl="12">
              <b-button @click="save()" variant="success">
                Simpan
                <i class="fa fa-save"></i>
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col cols="12" xl="12">
              <b-table
                :hover="hover"
                :striped="striped"
                :bordered="bordered"
                :small="small"
                :fixed="fixed"
                responsive="sm"
                :items="items"
                :fields="fields"
              >
                <!-- <template v-for="role in roles" slot-scope="data">
                  <b-form-checkbox
                    v-model="data.item[`cat${role.role_code.replace("-","_")}`]"
                    value="Y"
                    unchecked-value="N"
                  ></b-form-checkbox>
                </template> -->
                <template
                  v-for="role in roles"
                  :slot="role.role_code"
                  slot-scope="data"
                >
                  <b-form-checkbox
                    v-model="data.item[role.role_code]"
                    value="Y"
                    unchecked-value="N"
                  ></b-form-checkbox>
                </template>
                <!-- <template slot="cat2" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat2" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat3" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat3" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat4" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat4" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat5" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat5" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat6" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat6" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat7" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat7" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>
                <template slot="cat8" slot-scope="data">
                  <b-form-checkbox v-model="data.item.cat8" value="Y" unchecked-value="N"></b-form-checkbox>
                </template>-->
              </b-table>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col cols="12" xl="12">
              <b-button @click="save()" variant="success">
                Simpan
                <i class="fa fa-save"></i>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Permission",
  props: {
    caption: {
      type: String,
      default: "Hak Akses",
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
      items: [],
      roles: [],
      fields: [
        {
          key: "task_name",
          label: "Permission",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$http.get("/role").then((res) => {
        this.roles = res.items;
        this.fields = res.items.map((item) => {
          return {
            key: item.role_code,
            label: item.role_name,
          };
        });
        this.fields.unshift({
          key: `task_name`,
          label: `Permission`,
        });
      });
      this.get();
    },
    get() {
      this.$http.get("/permission").then((res) => {
        this.items = res;
      });
    },
    save() {
      this.$http
        .post("/permission/save", { permissions: this.items })
        .then((res) => {
          this.get();
          this.alert.success("Berhasil Mengubah Hak Akses User");
        })
        .catch((err) => {
          this.alert.error("Terjadi Kesalahan pada sistem");
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
