<template>
  <div class="card-action-slider">
    <div class="card-action-slider__animation">
      <!-- <marquee behavior="" direction="">{{ card_action_slider.animation }}</marquee> -->
      <marqu></marqu>
    </div>

    <!-- Title Slider -->
    <div class="card-action-slider__controls">
      <div ref="title" class="card-action-slider__titles">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) of card_action_slider.items" :key="index">
            <h3 class="card-action-slider__title">{{ item.title }}</h3>
          </div>
        </div>
      </div>
      <nav-arrows v-if="!isOnly" class="card-action-slider__arrows" ref="nav_arrows" :nav_count="nav_count"></nav-arrows>
    </div>

    <!-- Content Slider -->
    <div ref="content" class="card-action-slider__content">
      <div v-if="!isOnly" class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) of card_action_slider.items" :key="index">
          <card-action :card="item"></card-action>
        </div>
      </div>
      <card-action v-else :card="card_action_slider.items[0]"></card-action>
    </div>
  </div>
</template>

<script>
import CardAction from '^/CardAction';
import Marqu from '+/Marqu';

import { Swiper, Thumbs } from 'swiper';
Swiper.use([Thumbs]);

export default {
  components: {
    CardAction,
    Marqu,
  },

  data: (context) => ({
    titleSlider: null,
    contentSlider: null,
    isOnly: context.card_action_slider.items.length <= 1,
    nav_count: {
      color: 'white',
      current: 1,
      total: context.card_action_slider.items.length,
    },
  }),

  props: {
    card_action_slider: {
      animation: String,
      animation_separator: String,
      items: Array,
    }
  },

  mounted() {
    if (this.isOnly) return;

    this.titleSlider = new Swiper(this.$refs.title, {
      allowTouchMove: false,
      slidesPerView: 'auto',
      centeredSlides: true,
    });

    this.contentSlider = new Swiper(this.$refs.content, {
      speed: 1000,
      navigation: {
        prevEl: this.$refs.nav_arrows.getNavigation().prev,
        nextEl: this.$refs.nav_arrows.getNavigation().next,
        disabledClass: 'disabled',
      },
      allowTouchMove: false,
      thumbs: {
        swiper:  this.titleSlider,
      }
    });
  },
}
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.card-action-slider {
  color: $color-white;

  &__title {
    user-select: none;
    @include h2;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(40);
  }

  &__titles {
    display: flex;
    width: 200px;

    .swiper-slide {
      width: auto;
      opacity: 0.3;
      cursor: pointer;
      @include defaultTransition(opacity);

      &-thumb-active {
        opacity: 1;
      }

      &:not(:first-child) {
        margin-left: rem(40);
      }

      &:hover {
        opacity: 1;
      }
    }

    .swiper-wrapper {
      // width: 100px;
    }
  }

  &__arrows {
    flex-shrink: 0;
    margin-right: rem(-$indent-arrows-x);
  }

  &__content {
    &.swiper-container-initialized {

      .swiper-slide {
        @include defaultTransition(opacity);
        transition-duration: 1s;
        opacity: 0;

        &-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
