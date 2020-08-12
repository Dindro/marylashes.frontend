<template>
  <div>
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
