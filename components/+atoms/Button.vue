<template>
  <tag-link :link="button" tag="button" class="button" :class="classes">
    <span class="button__text">{{ button.text }}</span>
  </tag-link>
</template>

<script>
  import TagLink from './TagLink';

  export default {
    components: {
      TagLink,
    },

    computed: {
      classes() {
        let classes = '';

        if (this.button.color) {
          classes = ` button--${this.button.color}`;
        }

        return classes;
      }
    },

    props: {
      button: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    $b: #{&};

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 rem(32);
    text-align: center;
    border: none;
    border-radius: 0;
    background: none;
    height: rem(60);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    @include defaultTransition(color);

    &__text {
      position: relative;
      @include defaultTransition(transform);
      @include text-default;
    }

    &::before {
      content: '';
      background-color: $color-saphire;
      height: rem(10);
      width: rem(10);
      border-radius: 50%;
      position: absolute;
      margin: auto;
      opacity: 0;
      @include defaultTransition(transform, opacity);
    }

    &:hover {
      color: $color-dark;

      &::before {
        transform: scale(30);
        opacity: 1;
      }

      #{$b}__text {
        transform: scale(0.9);
      }
    }

    &,
    &--dark,
    &--default {
      background-color: $color-dark;
      color: $color-white;
    }

    &--outline-dark {
      border: 1px solid $color-dark;
      background-color: transparent;
      color: $color-dark;

      &::before {
        background-color: $color-dark;
      }

      &:hover {
        color: $color-white;
      }
    }

    &--outline-white {
      border: 1px solid $color-white;
      background-color: transparent;
      color: $color-white;

      &::before {
        background-color: $color-white;
      }

      &:hover {
        color: $color-dark;
      }
    }

    &--saphire {
      background-color: $color-saphire;
      color: $color-dark;

      &::before {
        background-color: $color-dark;
      }

      &:hover {
        color: $color-white;
      }
    }

    &--outline-saphire {
      border: 1px solid $color-saphire;
      background-color: transparent;
      color: $color-saphire;

      &::before {
        background-color: $color-saphire;
      }

      &:hover {
        color: $color-dark;
      }
    }
  }
</style>
