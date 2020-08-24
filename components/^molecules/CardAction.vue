<template>
  <div class="card-action">
    <div class="card-action__image">
      <image-vue :image="card.image"></image-vue>
    </div>
    <div class="card-action__content">
      <p class="card-action__text text-default" v-html="card.text"></p>
      <div v-if="card.actions" class="card-action__actions">
        <actions :actions="card.actions"></actions>
      </div>
    </div>
    <factoid-list class="card-action__factoids" :factoids="card.factoids"></factoid-list>
  </div>
</template>

<script>
import Image from '+/Image';

export default {
  components: {
    ImageVue: Image
  },
  props: {
    card: {
      image: Object,
      text: String,
      actions: Object,
      factoids: Object,
    }
  }
}
</script>

<style lang="scss">
.card-action {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "image factoids"
    "content factoids";

  &__image {
    grid-area: image;
    height: rem(250);
    margin-bottom: rem(48);

    .image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__content {
    grid-area: content;
  }

  &__text {
    max-width: 70%;
  }

  &__actions {
    margin-top: rem(32);
  }

  &__factoids {
    padding-left: rem(96);
    grid-area: factoids;
  }
}
</style>
