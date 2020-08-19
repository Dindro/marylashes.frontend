<template>
  <div class="card-service-list">
    <div
      v-for="(item, index) in card_service_list.items"
      :key="index"
      class="pt-lg-112 pt-md-96 pb-lg-112 pt-0"
      :class="{ 'pb-64': !item.type || (item.type && item.type !== 'full')} /* Если не full то ставим данный класс */"
    >
      <card-service :card="item"></card-service>
    </div>
  </div>
</template>

<script>
import CardService from "^/CardService";

export default {
  components: {
    CardService,
  },

  props: {
    card_service_list: {
      items: Array,
    }
  },
};
</script>
