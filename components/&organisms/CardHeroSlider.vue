<template>
  <div class="card-hero-slider pin-spacer--imitate" ref="swiper">
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

import gsap from 'gsap';
import { Swiper, Pagination } from 'swiper';
import { isDesktop } from '~/utils/breakpoints';
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
      animation: null,
      isOnly: context.card_hero_slider.items.length <= 1,
      nav_count: {
        color: 'white',
        current: 1,
        total: context.card_hero_slider.items.length,
      },
    }
  },

  methods: {
    initSlider() {
      if (this.isOnly) return;
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
    },

    initAnimation() {
      const { swiper } = this.$refs;
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (isDesktop()) {
        // Параллакс медленный вниз
        this.animation = gsap.to(swiper, {
          scrollTrigger: {
            trigger: swiper,
            start: 'top top',
            end: () => window.innerHeight,
            scrub: true,
          },
          ease: 'none',
          translateY: '65%',
        });
      } else {
        // Установка PIN
        this.animation = ScrollTrigger.create({
          trigger: swiper,
          start: 'top top',
          pin: true,
          pinSpacing: false,
        });
      }
    }
  },

  mounted() {
    this.initSlider();
    this.initAnimation();
  },

  beforeDestroy() {
    // Убираем slider и анимацию
    if (this.slider) this.slider.destroy();
    if (this.animation) {
      this.animation.kill();
      this.animation = null;
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

    @include media-breakpoint-down(sm) {
      bottom: auto;
      top: $height-screen;
      transform: translateY(-100%) translateY(#{rem(-8)});
    }

    > * + * {
      margin-left: rem(32);

      @include media-breakpoint-down(sm) {
        margin-left: rem(24);
      }
    }
  }

  &__arrows {
    margin-right: rem(-$indent-arrows-x);

    @include media-breakpoint-down(sm) {
      margin-right: rem(-$indent-arrows-x-sm);
    }
  }
}
</style>
