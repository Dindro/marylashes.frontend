<template>
  <div class="header">
    <div class="header__container container">
      <div class="header__logo header-logo">
        <tag-link class="header-logo__link" :link="header.logo">
          <logo class="header-logo__svg"></logo>
        </tag-link>
      </div>
      <div class="header__menu">
        <ul class="header__list">
          <li v-for="(item, index) in header.items" :key="index">
            <tag-link class="header__link text-default" :link="item">{{ item.text }}</tag-link>
          </li>
        </ul>
        <div class="header__contacts">
          <tag-link :link="header.phone" class="header__phone text-default">{{ header.phone.text }}</tag-link>
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
  import Logo from '+/Logo';
  import { mapState } from 'vuex';

  export default {
    components: {
      TagLink,
      Logo,
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
  z-index: $z-index-header;
  padding-top: rem(32);

  &__container {
    display: flex;
  }

  &__menu {
    margin-left: auto;
    display: flex;
  }

  &__list {
    display: flex;
    color: $color-white;
    list-style: none;
    margin: 0;
    padding: 0;

    li:not(:first-child) {
      margin-left: rem(40);
    }
  }

  &__contacts {
    margin-left: rem(40);
  }

  &__link {
    color: $color-white;
  }

  &__phone {
    color: $color-white;
  }

  &__mail {
    display: none;
  }
}

.header-logo {
  $b: #{&};

  &__link {
    display: inline-block;

    &:hover {
      #{$b}__svg {
        transform: translateY(#{rem(-8)});
        opacity: 0.65;
      }
    }
  }

  &__svg {
    @include defaultTransition(opacity, transform);
  }
}
</style>
