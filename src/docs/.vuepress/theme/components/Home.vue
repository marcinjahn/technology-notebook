<template>
    <main
        class="home"
        :aria-labelledby="data.heroText !== null ? 'main-title' : null"
    >
        <header class="hero">
            <Logo />
            <!-- <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <h1
        v-if="data.heroText !== null"
        id="main-title"
      >
        {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        class="description"
      >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p> -->

            <p v-if="data.actionText && data.actionLink" class="action">
                <NavLink class="action-button" :item="actionLink" />
            </p>
        </header>
        <!-- 
    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div> -->

        <div class="theme-default-content">
            <!-- <Content /> -->

            <p>
                Hi! My name is <a href="/about/who-am-i.html">Marcin Jahn</a>, I
                am a software engineer and technology enthusiast. Welcome to my
                <a href="/about/this-website.html">notebook</a>! You can either
                check out my notes about
                <a href="/programming">Programming</a> and various
                <a href="/technologies">Technologies</a> or just check out some
                updates from me below.
            </p>

            <hr />

            <div v-for="page in $pagination.pages">
                <BlogPost :post="page" class="blog-post" />
            </div>
            <div id="pagination">
                <router-link
                    v-if="$pagination.hasPrev"
                    :to="$pagination.prevLink"
                    >Prev</router-link
                >
                <router-link
                    v-if="$pagination.hasNext"
                    :to="$pagination.nextLink"
                    >Next</router-link
                >
            </div>
        </div>

        <div v-if="data.footer" class="footer">
            {{ data.footer }}
        </div>
    </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import Logo from "@theme/components/Logo.vue";
import BlogPost from "./BlogPost.vue";

export default {
    name: "Home",

    components: { NavLink, Logo, BlogPost },

    computed: {
        data() {
            return this.$page.frontmatter;
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText,
            };
        },
    },
};
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    display: flex;
    justify-content: center;
    // text-align center
    margin-top 10rem
    // img
    //   max-width: 100%
    //   max-height 280px
    //   display block
    //   margin 3rem auto 1.5rem
    // h1
    //   font-size 3rem
    // h1, .description, .action
    //   margin 1.8rem auto
    // .description
      // max-width 35rem
      // font-size 1.6rem
      // line-height 1.3
      // color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    padding $navbarHeight 0 0
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

  .hero
    margin-top 3rem !important


@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      // img
        // max-height 210px
        // margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem

.blog-post
  margin-bottom: 3rem;

hr
  height: 1px;
  background-color: #bbb;
  border: none;
  margin-top: 2rem;
</style>
