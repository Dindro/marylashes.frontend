<template>
  <div class="card-hero-slider" ref="swiper">
    <div class="swiper-wrapper" v-if="!isOnly">
      <div class="swiper-slide" v-for="(item, index) in card_hero_slider.items" :key="index">
        <card-hero :card="item"></card-hero>
      </div>
    </div>
    <card-hero v-else :card="card_hero_slider.items[0]"></card-hero>

    <div class="card-hero-slider__controls container" v-if="!isOnly">
      <nav-count :nav_count="nav_count"></nav-count>
    </div>
  </div>
</template>

<script>
  import CardHero from '^/CardHero';
import Swiper from 'swiper';

  export default {
    components: {
      CardHero,
    },

    props: {
      card_hero_slider: {
        type: Object,
        required: true,
      },
    },

    data: (context) => {
      return {
        slider: null,
        isOnly: context.card_hero_slider.items.length <= 1,
        nav_count: {
          color: 'white',
          current: 1,
          total: context.card_hero_slider.items.length,
        },
      }
    },

    mounted() {
      if (!this.isOnly) {
        this.slider = new Swiper(this.$refs.swiper, {
          speed: 1000,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.card-hero-slider {
  min-height: 100vh;
  height: 1px;
  background-color: $color-dark;

  &__controls {
    position: absolute;
    bottom: rem(24);
    right: 0;
    left: 0;
    z-index: 2;
  }
}
</style>
