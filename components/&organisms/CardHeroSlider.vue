<template>
  <div class="card-hero-slider" ref="swiper">
    <div class="swiper-wrapper" v-if="!isOnly">
      <div class="swiper-slide" v-for="(item, index) in card_hero_slider.items" :key="index">
        <card-hero :card="item"></card-hero>
      </div>
    </div>
    <card-hero v-else :card="card_hero_slider.items[0]"></card-hero>

    <div class="card-hero-slider__controls container" v-if="!isOnly">
      <nav-count ref="nav_count" :nav_count="nav_count"></nav-count>
      <nav-arrows ref="nav_arrows" class="card-hero-slider__arrows"></nav-arrows>
    </div>
  </div>
</template>

<script>
import CardHero from '^/CardHero';
import NavCount from '+/NavCount';
import NavArrows from '+/NavArrows';

import { Swiper, Pagination } from 'swiper';
Swiper.use([Pagination]);

export default {
  components: {
    CardHero,
    NavCount,
    NavArrows,
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
        pagination: {
          el: this.$refs.nav_count.$el,
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            this.nav_count.current = current;
            this.nav_count.total = total;
          },
        },
        navigation: {
          prevEl: this.$refs.nav_arrows.getNavigation().prev,
          nextEl: this.$refs.nav_arrows.getNavigation().next,
          disabledClass: 'disabled',
        }
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
  overflow: hidden;

  &__controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: rem(24);
    right: 0;
    left: 0;
    z-index: 2;

    > * + * {
      margin-left: rem(32);
    }
  }

  &__arrows {
    margin-right: rem(-$indent-arrows-x);
  }
}
</style>
