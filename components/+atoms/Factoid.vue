<template>
  <div class="factoid">
    <p class="factoid__top" v-if="factoid.top">{{ factoid.top }}</p>
    <div class="factoid__main">
      <p class="factoid__before" v-if="factoid.before">{{ factoid.before }}</p>
      <p class="factoid__number">{{ factoid.text }}</p>
      <p class="factoid__after" v-if="factoid.after">{{ factoid.after }}</p>
      <p class="factoid__sup" v-if="factoid.sup">{{ factoid.sup }}</p>
      <p class="factoid__sub" v-if="factoid.sub">{{ factoid.sub }}</p>
    </div>
    <p class="factoid__label" v-if="factoid.label" v-html="factoid.label"></p>
  </div>
</template>

<script>
  export default {
    props: {
      factoid: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .factoid {
    display: inline-block;

    &__before,
    &__number {
      @include text-fact;
      line-height: 0.75;
    }

    &__sub,
    &__sup,
    &__top,
    &__label {
      @include text-default;
    }

    &__before,
    &__number,
    &__after {
      display: inline-block;
    }

    &__after {
      font-size: rem(60);
      line-height: 0.75;
      font-weight: 700;
    }

    &__main {
      display: inline-flex;
      align-items: flex-start;
      position: relative;
    }

    &__sup {
      position: absolute;
      top: 0;
      left: 100%;
      margin-left: rem(10);
    }

    &__sub {
      position: absolute;
      bottom: 0;
      left: 100%;
      margin-left: rem(10);
    }

    &__sub,
    &__sup,
    &__top {
      opacity: 0.3;
      line-height: 1;
    }

    &__label {
      margin-top: rem(10);
      max-width: rem(160);
    }

    &__top {
      margin-bottom: rem(10);
    }
  }
</style>
