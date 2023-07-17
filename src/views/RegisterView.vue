<template>
  <div class="home">
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "@/components/RegisterComponent.vue";

export default {
  name: "RegisterView",
  components: {
    Register,
  },
};
</script>
<style scoped>
.home {
  background-image: url(../../public/images/network2.webp);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
