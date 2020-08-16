<template>
  <div class="layout">
    <header-vue></header-vue>
    <Nuxt />
  </div>
</template>

<script>
import Header from '&/Header';

export default {
  components: {
    HeaderVue: Header,
  }
}
</script>

<style lang="scss">
.layout {
  overflow-x: hidden;
}
</style>
