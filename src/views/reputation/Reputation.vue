<template>
  <div id="app">
    <Header></Header>
    <Breadcrumb
      name="声望大全"
      slug="reputation"
      :publishEnable="true"
      :feedbackEnable="true"
      :crumbEnable="false"
    >
    </Breadcrumb>
    <LeftSidebar>
      <Nav></Nav>
    </LeftSidebar>
    <Main
      :withoutRight="true"
      :withoutLeft="hasSidebar"
    >
      <div class="m-main">
        <router-view />
      </div>
      <Footer></Footer>
    </Main>
  </div>
</template>

<script>
import Nav from "@/components/reputation/nav.vue";

export default {
  name: "Reputation",
  components: { Nav },
  data: () => ({
    defaultExpandedKeys: ["reputation"],
    active: "",
  }),
  computed: {
    hasSidebar: function () {
      return this.$route.meta.sidebar;
    },
    routeName: function () {
      return this.$route.name;
    },
  },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
