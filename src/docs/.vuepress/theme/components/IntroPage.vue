<template>
  <main class="page">
    <Content class="theme-default-content intro disable-paper" />
  </main>
</template>

<script>

export default {
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
  
.intro
  margin-top: 10rem !important
  font-size 32px
</style>
