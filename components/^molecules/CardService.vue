<template>
  <div class="card-service">
    <div class="card-service__illustration"></div>

    <div class="card-service__content">
      <div class="card-service__header">
        <h3 class="card-service__title">
          <span class="card-service__name">{{ card.name }}</span>
            —
          <span class="card-service__price">{{ card.price }}</span>
        </h3>
        <p class="card-service__text" v-html="card.text"></p>
      </div>
      <div class="card-service__actions">
        <actions :actions="card.actions"></actions>
      </div>
    </div>
  </div>
</template>

<script>
  import Actions from '^/Actions';
  export default {
    components: {
      Actions,
    },
    // TODO: Global Price Filter
  }
</script>

<style lang="scss" scoped>

</style>
