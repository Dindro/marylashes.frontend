<template>
  <div class="card-service-list">
    <div class="pt-lg-112 pt-md-96 pb-lg-112 pt-0 pb-64" v-for="(item, index) in card_service_list.items" :key="index">
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
