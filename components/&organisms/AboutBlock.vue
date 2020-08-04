<template>
  <div class="about">
    <div class="about__content">
      <div class="about__photo"></div>
      <p class="about__title">
        «Привет, меня зовут Мария Ижуткина, я лучший lasheмейкер в городе и я подчеркну твою индвидуальность»
      </p>
      <div class="about__socials">
        <socials :socials="socials"></socials>
      </div>
    </div>
    <div class="about__facts">
      <factoid-list :factoidList="factoidList"></factoid-list>
    </div>
  </div>
</template>

<script>
import FactoidList from "&/FactoidList";
import Socials from "^/Socials";

export default {
  components: {
    FactoidList,
    Socials
  },

  data: () => {
    return {
      factoid: {
        text: "90",
        top: "2",
        sup: "от",
        sub: "d",
        label: "wdqwdqwd qwdq qdw qwwdw",
        after: "%",
      },
      factoidList: {
        items: [
          {
            text: "90",
            top: "2",
            sup: "от",
            sub: "d",
            label: "wdqwdqwd qwdq qdw qwwdw",
            after: "%",
          },
          {
            text: "90",
            top: "2",
            sup: "от",
            sub: "d",
            label: "wdqwdqwd qwdq qdw qwwdw",
            after: "%",
          },
          {
            text: "90",
            top: "2",
            sup: "от",
            sub: "d",
            label: "wdqwdqwd qwdq qdw qwwdw",
            after: "%",
          },
        ],
      },
      socials: {
        title: 'Я в социальных сетях',
        items: [
          {
            text: 'Vk',
            href: 'vk.com'
          },
          {
            text: 'In',
            href: 'vk.com'
          },
          {
            text: 'Fb',
            href: 'vk.com'
          },
          {
            text: 'Vb',
            href: 'vk.com'
          },
          {
            text: 'Wa',
            href: 'vk.com'
          }
        ]
      },
    };
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
  }

  &__photo {
    margin-left: rem(-40);
    height: rem(264);
    background-color: $color-black;
  }

  &__title {
    @include text-lead-charter;
    text-align: right;
    margin-top: rem(40);

    @include media-breakpoint-down(sm) {
      @include text-default-charter;
    }
  }

  &__socials {
    margin-top: rem(48);
    text-align: right;
  }
}
</style>
