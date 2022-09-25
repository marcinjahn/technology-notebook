<template>
<div>
    <a :href="post.path"><h2>{{ post.title }}</h2></a>
    <p>{{ postBody }}</p>
</div>
</template>

<script>
export default {
    name: "BlogPost",
    props: ['post'],
    computed: {
        postBody() {
            return this.post.frontmatter.summary.substring(this.post.title.length) + "...";
        }
    }
};
</script>