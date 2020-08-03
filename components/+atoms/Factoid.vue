<template>
  <div class="factoid">
    <p class="factoid__top" v-if="factoid.top">{{ factoid.top }}</p>
    <div class="factoid__main">
      <p class="factoid__before" v-if="factoid.before">{{ factoid.before }}</p>
      <p class="factoid__number">{{ factoid.text }}</p>
      <p class="factoid__after" v-if="factoid.after">{{ factoid.after }}</p>
      <div class="factoid__indexes" v-if="factoid.sub || factoid.sup">
        <p class="factoid__sup" v-if="factoid.sup">{{ factoid.sup }}</p>
        <p class="factoid__sub" v-if="factoid.sub">{{ factoid.sub }}</p>
      </div>
    </div>
    <p class="factoid__label" v-if="factoid.label">{{ factoid.label }}</p>
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

</style>
