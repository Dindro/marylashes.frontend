<template>
  <div class="marqu" :class="[`color-${marqu.color ? marqu.color : 'white'}`]">
    <span class="marqu__item" v-for="item in 10" :key="item">
      {{ marqu.text }}
      <span v-if="marqu.separator">{{ marqu.separator }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    marqu: {
      text: String,
      separator: String,
      direction: {
        type: String,
        default: 'row',
      },
      color: {
        type: String,
        color: 'white',
      }
    }
  },

  data: () => ({
    animation: null,
  }),

  methods: {
    initScrolling() {
      const gsap = require('gsap').default;
		  const { ScrollTrigger } = require('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: this.$el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      this.animation = timeline.to(this.$el, {
        xPercent: this.marqu.direction === 'right' ? 10 : -10,
        ease: 'none',
      });
    }
  },

  mounted() {
    this.initScrolling();
  },

  beforeDestroy() {
    if (this.animation) {
      this.animation.kill();
      this.animation = null;
    }
  }
}
</script>

<style lang="scss">
.marqu {
  $b: #{&};
  white-space: nowrap;
  margin-left: -200vw;
  margin-right: -200vw;
  will-change: transform;
  user-select: none;

  &__item {
    display: inline-block;
    font-size: rem(150);
    line-height: 0.66;

	@include media-breakpoint-down(md) {
		font-size: rem(100);
	}

	@include media-breakpoint-down(sm) {
		font-size: rem(70);
	}

    & + & {
      margin-left: 0.3em;
    }

    &:nth-child(even) {
      @supports (-webkit-text-stroke: 1px $color-white) {
        -webkit-text-stroke: 1px $color-white;
        -webkit-text-fill-color: transparent;

        @at-root .color-saphire & {
          -webkit-text-stroke-color: $color-saphire;
        }
      }
    }
  }
}
</style>
