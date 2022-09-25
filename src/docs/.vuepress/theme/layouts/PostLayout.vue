<template>
    <div class="theme-container">
        <Navbar />

        <main class="home">
            <div class="theme-default-content">
                <Content />
                <router-link class="gohome" to="/">&larr; Go Home</router-link>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue";

export default {
    name: "PostLayout",

    components: {
        Navbar,
    },
};
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block

.gohome
    margin-top: 2rem;
    display: block;

@media (max-width: $MQMobile)
  .home
    padding $navbarHeight 0 0
</style>
