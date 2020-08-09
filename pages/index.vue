<template>
  <div>
    <div>
      <div class="container">
        <about-block></about-block>
      </div>
      <div class="container">
        <card-service-list></card-service-list>
      </div>
      <nuxt-link to="/articles">articles</nuxt-link>
    </div>
  </div>
</template>

<script>
import Btn from '+/Button';

import AboutBlock from '&/AboutBlock';
import CardServiceList from '&/CardServiceList';

export default {
  components: {
    Btn,
    CardServiceList
  }
}
</script>

<style>

</style>
