<template>
  <div class="marqu">
    <span class="marqu__item" v-for="item in 20" :key="item">
      ACTION •
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.marqu {
  white-space: nowrap;

  &__item {
    display: inline-block;
    animation: marqu 20s linear infinite;
  }
}


@keyframes marqu {
  to {
    transform: translateX(-100vw);
  }
}
</style>
