<template>
  <Nav></Nav>
  <router-view/>
</template>

<script>
import Nav from "@/common/Nav";
export default {
  name: "Index",
  components: {
    Nav
  }
}
</script>

<style scoped>

</style>