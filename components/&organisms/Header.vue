<template>
  <div class="header">
    <div class="header__container container">
      <div class="header__logo"></div>
      <div class="header__menu">
        <ul class="header__list">
          <li v-for="(item, index) in header.items" :key="index">
            <tag-link class="header__link text-default" :link="item">{{ item.text }}</tag-link>
          </li>
        </ul>
        <div class="header__contact">
          <tag-link :link="header.phone" class="header__phone">{{ header.phone.text }}</tag-link>
          <tag-link :link="header.mail" class="header__mail">{{ header.mail.text }}</tag-link>
        </div>
      </div>
      <div class="header__burger">

      </div>
    </div>
  </div>
</template>

<script>
  import TagLink from '+/TagLink';
  import { mapState } from 'vuex';

  export default {
    components: {
      TagLink,
    },

    computed: mapState([
      'header'
    ]),
  }
</script>

<style lang="scss">
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  color: $color-white;

  &__container {
    display: flex;
  }

  &__list {
    display: flex;
    color: $color-white;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    color: $color-white;
  }
}
</style>
