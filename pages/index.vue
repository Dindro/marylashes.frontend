<template>
  <div>
    <card-hero-slider :card_hero_slider="card_hero_slider"></card-hero-slider>

    <div class="bg-light pt-lg-112 pb-lg-160 pb-112">
      <div class="container">
        <about-block :about="about"></about-block>
      </div>
    </div>

    <div class="bg-white">
      <div class="container">
        <card-service-list :card_service_list="card_service_list"></card-service-list>
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
