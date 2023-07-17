<template>
  <div class="home">
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from "@/components/CreatePostComponent.vue";

export default {
  name: "CreatePostView",
  components: {
    CreatePost,
  },
};
</script>
<style scoped></style>
