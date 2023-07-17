<template>
  <LayoutComponent>
    <h2 class="text-danger text-center">this is message post component</h2>
  </LayoutComponent>
</template>

<script>
import LayoutComponent from "../components/LayoutComponent.vue";
export default {
  name: "MessageComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {};
  },
  methods: {
    name() {},
  },
  mounted() {},
};
</script>

<style scoped></style>
