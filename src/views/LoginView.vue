<template>
  <div class="home">
    <LoginComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "LoginView",
  components: {
    LoginComponent,
  },
};
</script>
<style scoped>
.home {
  background-image: url(../../public/images/network.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
