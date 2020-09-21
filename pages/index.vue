<template>
  <div>
    <card-hero-slider :card_hero_slider="card_hero_slider"></card-hero-slider>

    <section class="bg-light pt-lg-112 pb-lg-160 pb-112">
      <div class="container">
        <about-block :about="about"></about-block>
      </div>
    </section>

    <section class="bg-white">
      <div class="container">
        <card-service-list :card_service_list="card_service_list"></card-service-list>
      </div>
    </section>

    <section v-animate="'border'" class="bg-saphire pt-md-112 pb-md-112 pt-64 pb-96">
      <div class="container">
        <info-block :info="info"></info-block>
      </div>
    </section>

	<section class="bg-white pt-md-112 pb-md-112 pt-64 pb-96">
      <div class="container">
        <review-slider-list :review_slider_list="review_slider_list"></review-slider-list>
      </div>
    </section>

    <section class="bg-white">
      <div class="container">
        <contact-block :contact="contact"></contact-block>
      </div>
    </section>

    <section class="bg-dark pb-64 pb-md-96">
      <div class="container">
        <card-action-slider :card_action_slider="card_action_slider"></card-action-slider>
      </div>
    </section>

	<section class="bg-white pt-md-96 pb-md-96 pt-64 pb-64">
      <div class="container">
        <photo-gallery :photo_gallery="photo_gallery"></photo-gallery>
      </div>
    </section>

	<section class="bg-white pt-md-96 pb-md-96 pt-64 pb-64">
      <div class="container">
        <card-article-slider :card_article_slider="card_article_slider"></card-article-slider>
      </div>
    </section>
  </div>
</template>

<script>
import AboutBlock from '&/AboutBlock';
import CardServiceList from '&/CardServiceList';
import CardHeroSlider from '&/CardHeroSlider';
import InfoBlock from '&/InfoBlock';
import ContactBlock from '&/ContactBlock';
import CardActionSlider from '&/CardActionSlider';
import ReviewSliderList from '&/ReviewSliderList';
import PhotoGallery from '&/PhotoGallery';
import CardArticleSlider from '&/CardArticleSlider';

export default {
  components: {
    CardServiceList,
    CardHeroSlider,
    InfoBlock,
    ContactBlock,
	CardActionSlider,
	ReviewSliderList,
	PhotoGallery,
	CardArticleSlider,
  },

  asyncData(ctx) {
    return ctx.app.$axios.get('/api/v1/index').then((res) => {
      return res.data;
    })
  },
}
</script>
