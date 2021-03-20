<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-row> </b-row>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "User",
  props: {
    caption: {
      type: String,
      default: "Data Role",
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
          label: "Kode Peran",
          sortable: true,
        },
        {
          key: "role_name",
          label: "Nama Peran",
          sortable: true,
        },
      ],
      submitted: false,
      total: 0,
      roleList: [],
    };
  },
  async created() {
    this.get();
    await this.init();
  },
  methods: {
    async init() {},
    get() {},
  },
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
