<template>
    <div>
        <a :href="post.path"
            ><h4>{{ post.title }}</h4></a
        >
        <p>{{ postBody }} <a :href="post.path">(Read more...)</a></p>
    </div>
</template>

<script>
export default {
    name: "BlogPost",
    props: ["post"],
    computed: {
        postBody() {
            return this.post.frontmatter.summary.substring(
                this.post.title.length
            ) + "...";
        },
    },
};
</script>
