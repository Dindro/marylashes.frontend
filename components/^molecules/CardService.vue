<template>
  <div class="card-service" :class="`card-service--${card.type ? card.type : 'default'}`">
    <div class="card-service__illustration">

      <!-- IF NOT Full -->
      <div v-if="card.type !== 'full'" ref="swiper" class="card-service__swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in card.photos" :key="index">
            <image-vue class="card-service__image" :image="item"></image-vue>
          </div>
        </div>

        <div class="card-service__hover hover-change">
          <div class="hover-change__item"
            v-for="(item, index) in card.photos"
            :key="index"
            @mouseenter="changeSlide(item, index)"
          >
          </div>
        </div>
      </div>
      <nav-count v-if="card.type !== 'full'" ref="nav_count" :nav_count="nav_count"></nav-count>

      <!-- IF Full -->
      <image-vue v-if="card.type === 'full'" class="card-service__image" :image="card.photos[0]"></image-vue>

    </div>

    <div class="card-service__content">

      <!-- Header -->
      <div class="card-service__header">
        <h3 class="card-service__title">
          <span class="card-service__name">{{ card.name }}</span>
            —
          <span class="card-service__price">{{ card.price }}</span>
        </h3>
        <p class="card-service__text text-default" v-if="card.text" v-html="card.text"></p>
      </div>

      <!-- Actions -->
      <div class="card-service__actions">
        <actions v-if="card.actions" :actions="card.actions"></actions>
      </div>

    </div>
  </div>
</template>

<script>
  import Actions from '^/Actions';
  import Image from '+/Image';
  import NavCount from '+/NavCount';

  import { Swiper, Pagination } from 'swiper';
  Swiper.use([Pagination]);

  import { devices } from '@/utils/breakpoints';

  export default {
    components: {
      Actions,
      ImageVue: Image,
      NavCount,
    },

    data: (context) => {
      return {
        slider: null,
        nav_count: {
          current: 1,
          total: context.card.photos.length,
        }
      }
    },

    props: {
      card: {
        type: Object,
        required: true,
      }
    },

    methods: {
      changeSlide(item, index) {
        this.slider.slideTo(index, 0);
      }
    },

    mounted() {
      if (this.card.type === 'full') return;

      this.slider = new Swiper(this.$refs.swiper, {
        pagination: {
          el: this.$refs.nav_count.$el,
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            this.nav_count.current = current;
            this.nav_count.total = total;
          }
        },
        breakpoints: {
          [devices.md]: {
            spaceBetween: 24,
          },
          [devices.lg]: {
            spaceBetween: 0,
          }
        }
      });
    },

    beforeDestroy() {
      if (this.slider) this.slider.destroy();
    }
  }
</script>

<style lang="scss">
@import '~swiper/swiper.scss';

.card-service {
  $b: #{&};
  display: flex;
  height: rem(400);

  @include media-breakpoint-down(md) {
    display: block;
    height: auto;
  }

  &__illustration,
  &__content {
    width: 50%;

    @include media-breakpoint-down(md) {
      width: rem(590);
    }

    @include media-breakpoint-down(sm) {
      width: auto;
    }
  }

  $indent-full: 104;
  $indent-between: $indent-full / 2;
  $swiper-cuddle-width: 640;

  &__illustration {
    position: relative;

    @include media-breakpoint-up(lg) {
      padding-right: rem($indent-between);
    }

    @include media-breakpoint-down(md) {
      height: rem(400);
    }

    @include media-breakpoint-down(sm) {
      height: rem(244);
      width: 100%;
    }
  }

  &__content {
    padding-top: rem(32);
    padding-bottom: rem(32);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include media-breakpoint-up(lg) {
      padding-left: rem($indent-between);
    }

    @include media-breakpoint-down(md) {
      padding-bottom: 0;
    }

    @include media-breakpoint-down(sm) {
      padding-top: rem(24);
    }
  }

  &__title {
    @include h2-thin;
  }

  &__text {
    margin-top: rem(16);
    opacity: 0.65;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__swiper {
    position: relative;
    margin-left: rem(-40);
    height: 100%;
    overflow: hidden;

    @include media-breakpoint-down(md) {
      margin: 0;
      overflow: visible;
    }

    @include media-breakpoint-down(sm) {
      margin-left: rem(-$wrapper-gutter-sm-1);
      margin-right: rem(-$wrapper-gutter-sm-1);
    }
  }

  &__actions {
    @include media-breakpoint-down(md) {
      margin-top: rem(48);
    }

    @include media-breakpoint-down(sm) {
      margin-top: rem(24);
    }
  }

  &__hover {
    @include media-breakpoint-down(md) {
      display: none !important;
    }
  }

  .swiper-wrapper {
    z-index: auto;
  }

  .swiper-container-initialized {
    .swiper-slide {
      @include media-breakpoint-only(md) {
        @include defaultTransition(opacity);
        opacity: 0.3;

        &-active {
          opacity: 1;
        }
      }
    }
  }

  .nav-count {
    opacity: 0.65;
    position: absolute;
    bottom: calc(100% + #{rem(16)});
    right: rem($indent-between);

    @include media-breakpoint-down(md) {
      right: 0;
    }

    @include media-breakpoint-down(sm) {
      left: 0;
      right: auto;
    }
  }

  // Реверсивный
  &--reverse,
  &--reverse-cuddle {
    flex-direction: row-reverse;

    @include media-breakpoint-down(md) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    #{$b}__swiper {
      margin-left: 0;
      margin-right: rem(-40);

      @include media-breakpoint-down(md) {
        margin-right: 0;
      }

      @include media-breakpoint-down(sm) {
        margin-left: rem(-$wrapper-gutter-sm-1);
        margin-right: rem(-$wrapper-gutter-sm-1);
      }
    }

    #{$b}__title,
    #{$b}__text {
      text-align: right;
    }

    #{$b}__illustration {
      @include media-breakpoint-up(lg) {
        padding-right: 0;
        padding-left: rem($indent-between);
      }
    }

    #{$b}__content {
      @include media-breakpoint-up(lg) {
        padding-left: 0;
        padding-right: rem($indent-between);
      }
    }

    .actions {
      justify-content: flex-end;
    }

    .nav-count {
      left: rem($indent-between);
      right: auto;

      @include media-breakpoint-down(md) {
        left: 0;
      }

      @include media-breakpoint-down(sm) {
        left: auto;
        right: 0;
      }
    }
  }

  &--reverse-cuddle {
    @include media-breakpoint-up(lg) {
      transform: translateX(rem(-$indent-full));
    }

    #{$b}__content {
      padding-left: rem($indent-full);

      @include media-breakpoint-down(sm) {
        padding-left: 0;
      }
    }

    #{$b}__swiper {
      @include media-breakpoint-up(lg) {
        margin-right: rem(-$indent-full);
      }
    }

    #{$b}__illustration {
      @include media-breakpoint-down(md) {
        width: rem($swiper-cuddle-width);
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }

  // Прижиматься
  &--cuddle {
    transform: translateX(rem($indent-full));

    @include media-breakpoint-down(md) {
      transform: none;
    }

    #{$b}__content {
      @include media-breakpoint-up(lg) {
        padding-right: rem($indent-full);
      }
    }

    #{$b}__swiper {
      @include media-breakpoint-up(lg) {
        margin-left: rem(-$indent-full);
      }
    }

    #{$b}__illustration {
      @include media-breakpoint-down(md) {
        width: rem($swiper-cuddle-width);
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
  }

  &--full {
    display: block;
    position: relative;
    height: rem(590);
    margin-left: rem($indent-full);

    @include media-breakpoint-down(md) {
      margin-left: rem(-$wrapper-gutter-md-1);
      margin-right: rem(-$wrapper-gutter-md-1);
    }

    @include media-breakpoint-down(sm) {
      margin-left: rem(-$wrapper-gutter-sm-1);
      margin-right: rem(-$wrapper-gutter-sm-1);
    }

    #{$b}__illustration {
      z-index: auto;
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: auto;

      @include media-breakpoint-down(md) {
        height: auto !important;
      }

      &::after {
        content: '';
        position: absolute;
        padding: 0;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: $color-dark;
        opacity: 0.5;
      }
    }

    #{$b}__swiper {
      margin-left: 0;
    }

    #{$b}__header {
      max-width: rem(500);
    }

    #{$b}__content {
      position: relative;
      width: auto;
      height: 100%;
      padding: rem(64) 0 rem(80) rem(120);
      color: $color-white;

      @include media-breakpoint-down(md) {
        padding: rem(64) rem($wrapper-gutter-md-1) rem(80) rem($wrapper-gutter-md-1);
      }

      @include media-breakpoint-down(sm) {
        padding: rem(64) rem($wrapper-gutter-sm-1) rem(80) rem($wrapper-gutter-sm-1);;
      }
    }
  }
}

.hover-change {
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  &__item {
    flex: 1;
  }
}
</style>
