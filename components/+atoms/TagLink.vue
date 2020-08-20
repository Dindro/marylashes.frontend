<template>
  <nuxt-link :to="link.href || {}" :tag="tag || link.tag || 'a'">
    <slot>{{ link.text }}</slot>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      link: {
        type: Object,
        required: true,
      },
      tag: {
        type: String
      }
    },
  }
</script>
