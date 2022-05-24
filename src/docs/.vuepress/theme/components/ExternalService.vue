<template>
  <a target="_blank" :href="url">
    <img v-if="logoImg" :src="$withBase(logoImg)" />
    <span v-else>{{title}}</span>
  </a>
</template>

<script>
export default {
  name: "ExternalService",
  props: ["logoImg", "url", "title"],
};
</script>

<style scoped lang="stylus">
a
  margin-left: 1.5rem;

img
  height: 1.2rem;
  margin-bottom: -0.2rem;

  &:hover
    filter: opacity(75%);
    
</style>
