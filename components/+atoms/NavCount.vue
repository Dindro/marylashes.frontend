<template>
  <div class="nav-count" :class="[classes]">
    <span class="nav-count__current">{{ nav_count.current }}</span>
    <span class="nav-count__separator">—</span>
    <span class="nav-count__total">{{ nav_count.total }}</span>
  </div>
</template>

<script>
export default {
  props: {
    nav_count: {
      type: Object,
    },
  },

  computed: {
    classes() {
      let classes = "";

      if (this.nav_count.color) {
        classes = ` nav-count--${this.nav_count.color}`;
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
.nav-count {
  @include text-default;
  display: inline-block;
  font-feature-settings: "tnum";
  white-space: nowrap;

  &--white {
    color: $color-white;
  }
}
</style>
