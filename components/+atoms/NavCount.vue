<template>
  <div class="nav-count">
    <span class="nav-count__current">{{ navCount.current }}</span>
    <span class="nav-count__separator"> — </span>
    <span class="nav-count__total">{{ navCount.total }}</span>
  </div>
</template>

<script>
export default {
  props: {
    navCount: {
      type: Object,
    }
  }
}
</script>

<style lang="scss">
.nav-count {
  @include text-default;
  font-feature-settings: 'tnum';
  white-space: nowrap;
}
</style>
