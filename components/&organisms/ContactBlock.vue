<template>
  <div class="contact">
    <h2 class="contact__title">{{ contact.title }}</h2>
    <div class="contact__about">
      <p class="contact__name">{{ contact.name }}</p>
      <socials class="contact__socials" :socials="contact.socials"></socials>
      <p class="contact__phone contact__link text-default"><tag-link :link="contact.phone"></tag-link></p>
      <p class="contact__mail contact__link text-default"><tag-link :link="contact.mail"></tag-link></p>
    </div>
    <div class="contact__actions">
      <actions :actions="Object.assign(contact.actions, { column: true })"></actions>
    </div>
    <image-vue :image="contact.image" class="contact__photo"></image-vue>
    <p class="contact__map-text text-default">{{ contact.map_text }}</p>
    <div v-animate="mapAnimation" class="contact__map">
      <map-vue :map="contact.map"></map-vue>
    </div>
  </div>
</template>

<script>
  import TagLink from '+/TagLink';
  import Image from '+/Image';
  import Socials from '^/Socials';
  import Actions from '^/Actions';
  import Map from '^/Map';

  export default {
    components: {
      ImageVue: Image,
      MapVue: Map,
    },

    data: () => ({
      mapAnimation: {
        name: 'border',
        start: 'top 80%',
        end: 'bottom 80%',
      }
    }),

    props: {
      contact: {
        title: String,
        name: String,
        phone: Object,
        mail: Object,
        socials: Object,
        actions: Object,
        map: Object,
        map_text: String,
        image: Object,
      }
    }
  }
</script>

<style lang="scss">
.contact {
  display: grid;
  grid-template-columns: 35% 15% 7% 43%;
  grid-template-rows: rem(96) auto rem(32) rem(16) auto rem(64) auto rem(32) auto rem(140);

  &__title {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    @include h2;
  }

  &__about {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
  }

  &__socials {
    margin-top: rem(16);
    margin-bottom: rem(8);
  }

  &__map-text {
    grid-column: 1 / 3;
    grid-row: 9 / 10;
    text-align: right;
    padding: rem(32) rem(32) 0 25%;
    opacity: 0.3;
    @include text-small;
  }

  &__actions {
    grid-column: 1 / 2;
    grid-row: 7 / 8;
  }

  &__map {
    grid-column: 3 / 5;
    grid-row: 1 / 11;
    background-color: $color-dark;
    margin-right: rem(-$wrapper-gutter-lg-1);

    @include media-container-up {
      margin-right: $indent-container-up;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    z-index: 1;
    grid-column: 2 / 4;
    grid-row: 4 / 9;
  }

  &__logo {
    margin-bottom: rem(16);
  }

  &__name {
    @include h1;
  }

  &__link {
    & + & {
      margin-top: rem(4);
    }

    & > * {
      opacity: 0.3;
      @include defaultTransition(opacity);

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
