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
    cursor: pointer;

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
    }
  }
</style>
