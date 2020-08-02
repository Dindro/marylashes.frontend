<template>
  <div class="card-hero">
    <div class="card-hero__bg"></div>
    <div class="container">
      <div class="card-hero__content">
        <h1 v-if="card.title" class="card-hero__title h1">{{ card.title }}</h1>
        <actions v-if="card.actions" class="card-hero__actions" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
