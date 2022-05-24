<template>
  <span class="external-services">
    <ExternalService v-for="service in services" 
    :logoImg="service.img"
    :url="service.url"
    :title="service.title"
    :key="service.url" />
  </span>
</template>

<script>
import ExternalService from "./ExternalService.vue";

export default {
  name: "ExternalServices",
  components: {
    ExternalService,
  },
  computed: {
    services() {
      const services = this.$site.themeConfig.externalServices;

      if (services === undefined) {
        return [];
      }

      return services;
    },
  },
};
</script>

<style scoped lang="stylus">
.external-services
  @media (min-width: $MQMobile)
    border-left: 1px solid rgb(211, 211, 211);
    // border-right: 1px solid rgb(211, 211, 211);
    // padding-right: 1.5rem;
    margin-left: 1.5rem;
</style>
