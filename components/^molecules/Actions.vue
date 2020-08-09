<template>
  <div class="actions">
    <component
      class="actions__item"
      v-for="(item, index) in actions.items"
      :key="index"
      :is="getComponentTag(item)"
      :button="item"
      :link="item">
    </component>
  </div>
</template>

<script>
  import Btn from '+/Button';

  export default {
    components: {
      Btn,
    },

    props: {
      actions: {
        type: Object,
        required: true,
      }
    },

    methods: {
      getComponentTag(item) {
        if (item.type === 'button') return 'btn';
        return 'link-action';
      }
    }
  }
</script>

<style lang="scss">
.actions {
  display: flex;
  flex-wrap: wrap;
  margin: rem(-16) 0 0 rem(-24);

  &__item {
    margin: rem(16) 0 0 rem(24);
  }
}
</style>
