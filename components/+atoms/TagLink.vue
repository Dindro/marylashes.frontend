<template>
  <nuxt-link :to="link.to || {}" :tag="tag || link.tag || 'a'">
    <slot></slot>
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
