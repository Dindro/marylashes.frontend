<template>
  <div class="card-hero">
    <div class="card-hero__bg">
      <image-vue :image="card.image"></image-vue>
    </div>
    <div class="card-hero__container container">
      <div class="card-hero__content">
        <h1 v-if="card.title" class="card-hero__title" v-html="card.title"></h1>
        <actions v-if="card.actions" :actions="Object.assign(card.actions, { column: true })" class="card-hero__actions" />
      </div>
    </div>
  </div>
</template>

<script>
  import Actions from '^/Actions';
  import Image from '+/Image';

  import { Swiper, Pagination, Navigation } from 'swiper';
  Swiper.use([Pagination, Navigation]);

  export default {
    components: {
      Actions,
      ImageVue: Image,
    },

    props: {
      card: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.card-hero {
  height: 100%;
  position: relative;

  &__bg {
    &,
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }

    &::after {
      content: "";
      background-color: $color-dark;
      opacity: 0.65;
    }
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__container {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: $color-white;
  }

  &__title {
    @include h1;
    margin-bottom: rem(40);
  }
}
</style>
