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

        <div class="hover-change">
          <div class="hover-change__item"
            v-for="(item, index) in card.photos"
            :key="index"
            @mouseover="changeSlide(item, index)"
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

  &__illustration,
  &__content {
    width: 50%;
  }

  $indent-full: 104;
  $indent-between: $indent-full / 2;

  &__illustration {
    position: relative;
    @include media-breakpoint-up(lg) {
      padding-right: rem($indent-between);
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
  }

  .swiper-wrapper {
    z-index: auto;
  }

  .nav-count {
    position: absolute;
    bottom: calc(100% + #{rem(16)});
    right: rem($indent-between);
  }

  // Реверсивный
  &--reverse-cuddle,
  &--reverse {
    flex-direction: row-reverse;

    #{$b}__swiper {
      margin-left: 0;
      margin-right: rem(-40);
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
    }
  }

  &--reverse-cuddle {
    transform: translateX(rem(-$indent-full));

    #{$b}__content {
      padding-left: rem($indent-full);
    }

    #{$b}__swiper {
      @include media-breakpoint-up(lg) {
        margin-right: rem(-$indent-full);
      }
    }
  }

  // Прижиматься
  &--cuddle {
    transform: translateX(rem($indent-full));

    #{$b}__content {
      padding-right: rem($indent-full);
    }

    #{$b}__swiper {
      @include media-breakpoint-up(lg) {
        margin-left: rem(-$indent-full);
      }
    }
  }

  &--full {
    display: block;
    position: relative;
    height: rem(590);
    margin-left: rem($indent-full);

    #{$b}__illustration {
      z-index: -1;
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: auto;

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
        z-index: 2;
      }
    }

    #{$b}__swiper {
      margin-left: 0;
    }

    #{$b}__content {
      width: auto;
      height: 100%;
      padding: rem(64) 0 rem(80) rem(120);
      color: $color-white;
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
