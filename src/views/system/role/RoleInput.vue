<template>
  <form @submit.prevent="save">
    <input-text
      :required="true"
      :fieldname="'Kode Role'"
      v-model="input.role_code"
    />
    <input-text
      :required="true"
      :fieldname="'Nama Role'"
      v-model="input.role_name"
    />
    <text-area :fieldname="'Keterangan'" v-model="input.description" />
    <submit-button />
  </form>
</template>

<script>
import InputText from "../../../components/InputText.vue";
export default {
  components: { InputText },
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
