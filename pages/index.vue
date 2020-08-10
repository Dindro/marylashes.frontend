<template>
  <div>
    <card-hero-slider :card_hero_slider="card_hero_slider"></card-hero-slider>
    <div class="bg-light">
      <div class="container">
        <about-block :about="about"></about-block>
      </div>
    </div>
    <div>
      <div class="container">
        <card-service-list></card-service-list>
      </div>
    </div>
    <nuxt-link to="/articles">articles</nuxt-link>
  </div>
</template>

<script>
import Btn from '+/Button';

import AboutBlock from '&/AboutBlock';
import CardServiceList from '&/CardServiceList';
import CardHeroSlider from '&/CardHeroSlider';

export default {
  components: {
    Btn,
    CardServiceList,
    CardHeroSlider,
  },

  asyncData(context) {
    return context.app.$axios.get('/api/v1/index').then((res) => {
      return res.data;
    })
  },
}
</script>

<style>

</style>
