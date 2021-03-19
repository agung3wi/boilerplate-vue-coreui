<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com"
      />
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>superadmin (Super Admin)</strong>
      </b-dropdown-header>
      <b-dropdown-item> <i class="fa fa-wrench" /> Setting </b-dropdown-item>
      <b-dropdown-item to="/system/password">
        <i class="fa fa-user" /> Ubah Password
      </b-dropdown-item>
      <b-dropdown-item @click="logout()">
        <i class="fa fa-lock" /> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown,
  },
  data: () => {
    return { itemsCount: 42 };
  },
  methods: {
    async logout() {
      await this.$http
        .get("/logout")
        .then((res) => {})
        .catch((err) => {});
      this.$store.commit("set", ["isLogeddin", false]);
      this.$store.commit("set", ["token", null]);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
