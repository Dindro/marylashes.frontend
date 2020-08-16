<template>
  <div class="burger" :class="{ 'burger--open': isOpen }">
    <i class="burger__line burger__line--up"></i>
    <i class="burger__line burger__line--down"></i>
  </div>
</template>

<script>
  export default {
    props: {
      isOpen: Boolean,
    }
  }
</script>

<style lang="scss">
.burger {
  $b: #{&};

  cursor: pointer;
  position: relative;
  pointer-events: all;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: $color-white;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    transform: scale(1.5);
  }

  height: rem(40);
  width: rem(40);

  &__line {
    display: inline-block;
    height: 2px;
    border-radius: 2px;
    background-color: currentColor;
    width: 100%;
    margin: rem(3) 0;
    @include defaultTransition(transform, width);
    transition-duration: .5s;

    &--down {
      width: 60%;
    }
  }

  &--open {
    #{$b}__line {
      &--up {
        transform: rotate(45deg) translateY(#{rem(3)}) translateX(#{rem(3)});
      }

      &--down {
        transform: rotate(-45deg) translateY(#{rem(-3)}) translateX(#{rem(3)});
        width: 100%;
      }
    }
  }
}
</style>
