<template>
  <div class="socials">
    <p class="socials__title" v-if="socials.title">{{ socials.title }}</p>
    <ul class="socials__list">
      <li v-for="(item, index) in socials.items" :key="index">
        <tag-link :link="item" tag="a" class="socials__item">
          {{ item.text }}
        </tag-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import TagLink from '+/TagLink';
  export default {
    components: {
      TagLink,
    },

    props: {
      socials: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss">
.socials {
  display: inline-flex;
  align-items: center;

  @include text-default;

  &__title {
    margin-right: rem(56);
    opacity: 0.3;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  &__list {
    padding: 0;
    list-style: none;
    display: flex;
    margin: 0 rem(-12);
  }

  &__item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: rem(48);
    height: rem(48);
    opacity: 0.3;

    @include defaultTransition(opacity, transform);

    &:hover {
      opacity: 1;
      transform: translateY(#{rem(-6)});
    }
  }
}
</style>
