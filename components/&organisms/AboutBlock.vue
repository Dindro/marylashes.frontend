<template>
  <div class="about">
    <div class="about__content">
      <div class="about__photo">
        <image-vue :image="about.image"></image-vue>
      </div>
      <p class="about__title" v-html="about.title"></p>
      <div class="about__socials">
        <socials :socials="about.socials"></socials>
      </div>
    </div>
    <div class="about__facts">
      <factoid-list :factoids="about.factoids"></factoid-list>
    </div>
  </div>
</template>

<script>
import FactoidList from "&/FactoidList";
import Socials from "^/Socials";
import Image from '+/Image';

export default {
  components: {
    FactoidList,
    Socials,
    ImageVue: Image,
  },

  props: {
    about: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style lang="scss">
$indent-between: 104 / 2;

.about {
  @include media-breakpoint-up(lg) {
    display: flex;
  }

  &__content,
  &__facts {
    @include media-breakpoint-up(lg) {
      width: 50%;
    }
  }

  &__content {
    @include media-breakpoint-up(lg) {
      padding-right: rem($indent-between);
    }
  }

  &__facts {
    @include media-breakpoint-up(lg) {
      padding-left: rem($indent-between);
    }

    @include media-breakpoint-down(md) {
      padding-top: rem(56);
    }

    @include media-breakpoint-down(sm) {
      padding-top: rem(40);
    }
  }

  &__photo {
    margin-left: rem(-40);
    height: rem(264);

    @include media-breakpoint-down(md) {
      margin-left: rem(-$wrapper-gutter-md-1);
      margin-right: rem(-$wrapper-gutter-md-1);
    }

    @include media-breakpoint-down(sm) {
      height: auto;
      margin-left: rem(-$wrapper-gutter-sm-1);
      margin-right: rem(-$wrapper-gutter-sm-1);
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    @include text-lead-charter;
    text-align: right;
    margin-top: rem(40);

    @include media-breakpoint-down(sm) {
      margin-top: rem(24);
      text-align: center;
      @include text-default-charter;
    }
  }

  &__socials {
    margin-top: rem(48);
    text-align: right;

    @include media-breakpoint-down(md) {
      margin-top: rem(40);
    }

    @include media-breakpoint-down(sm) {
      text-align: center;
      margin-top: rem(16);
    }
  }
}
</style>
