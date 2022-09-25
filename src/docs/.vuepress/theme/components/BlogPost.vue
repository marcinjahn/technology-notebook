<template>
    <div>
        <router-link :to="post.path"><h4>{{ post.title }}</h4></router-link>
        <p>{{ postBody }} <router-link :to="post.path">(Read more)</router-link></p>
    </div>
</template>

<script>
export default {
    name: "BlogPost",
    props: ["post"],
    computed: {
        postBody() {
            return (
                this.post.frontmatter.summary.substring(
                    this.post.title.length
                ) + "..."
            );
        },
    },
    methods: {
        go(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style>
    h4 {
        margin-bottom: 0.1rem;
    }
</style>