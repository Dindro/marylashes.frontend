<template>
  <div class="factoid-list">
    <div class="factoid-list__item" v-for="(item, index) in factoids.items" :key="index">
      <factoid :factoid="item"></factoid>
    </div>
  </div>
</template>

<script>
  import Factoid from '+/Factoid';
  export default {
    components: {
      Factoid,
    },

    props: {
      factoids: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss">
  .factoid-list {
    display: flex;
    flex-wrap: wrap;
    margin: rem(-24);

    @include media-breakpoint-down(sm) {
      margin: 0;
    }

    &__item {
      width: 50%;
      padding: rem(24);

      @include media-breakpoint-down(sm) {
        padding: 0;
        width: 100%;

        & + & {
          margin-top: rem(32);
        }
      }
    }
  }
</style>
