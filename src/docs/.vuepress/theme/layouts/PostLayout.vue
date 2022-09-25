<template>
    <div class="theme-container">
        <Navbar />

        <main class="home">
            <div class="theme-default-content">
                <Content />
            </div>
        </main>
    </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import { resolveSidebarItems } from "../util";
import IntroPage from "../components/IntroPage.vue";

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

@media (max-width: $MQMobile)
  .home
    padding $navbarHeight 0 0
</style>
