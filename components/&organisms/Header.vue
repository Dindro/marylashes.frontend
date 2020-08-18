<template>
  <div class="header-shell" :class="{ 'is-open': isMenuOpen, 'is-fixed': isMenuFixed }">

    <div class="header-logo" ref="logo">
      <div class="header-logo__container container">
        <tag-link class="header-logo__link" :link="header.logo">
          <logo :small="isMenuFixed && !isMenuOpen" class="header-logo__icon"></logo>
        </tag-link>
        <burger class="header-logo__burger" @click.native="openMenu" @mouseenter.native="openMenu" :isOpen="isMenuOpen"></burger>
      </div>
    </div>

    <div class="header" ref="header">
      <div class="header__container container">
        <div class="header__menu">
          <ul class="header__list">
            <li v-for="(item, index) in header.items" :key="index">
              <tag-link class="header__link text-default" ref="link" :link="item">
                <span class="header__text">
                  {{ item.text }}
                </span>
              </tag-link>
            </li>
          </ul>
          <div class="header__contacts">
            <tag-link ref="phone" :link="header.phone" class="header__phone header__link text-default">
              <span class="header__text">
                {{ header.phone.text }}
              </span>
            </tag-link>
            <tag-link :link="header.mail" class="header__mail">{{ header.mail.text }}</tag-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import gsap from 'gsap';
  import { mapState } from 'vuex';
  import { isDesktop } from '@/utils/breakpoints';
  import { disableScroll, enableScroll } from '@/utils/scroll';

  import TagLink from '+/TagLink';
  import Logo from '+/Logo';
  import Burger from '+/Burger';

  export default {
    components: {
      TagLink,
      Logo,
      Burger,
    },

    data: () => ({
      isMenuFixed: false,
      isMenuOpen: false,
      menuAnimation: null,
    }),

    computed: mapState([
      'header'
    ]),

    methods: {
      openMenu(e) {
         // Если ПК
          // Проигрываем анимацию
          // Слушаем leave событие
            // Проигрываем обратную анимацию
        // Иначе
          // Если не открыто
            // Фиксируем позицию анти скролла
            // Проигрываем анимацию
          // Если открыто
            // Убираем фикс скрола
            // Проигрываем анимацю уходящую

        const { type } = e;
        switch (type) {
          case 'mouseenter':
            // Если ПК
            if (!isDesktop()) return;

            this.isMenuOpen = true;

            // Проигрываем анимацию
            this.playMenuAnimation();

            // Слушаем leave событие
            this.$refs.header.addEventListener('mouseleave', ()=> {
              this.isMenuOpen = false;
              this.reverseMenuAnimation();
            }, { once: true });
            break;

          case 'click':
            // Если ТАБ или МОБ
            if (isDesktop()) return;

            // Если не открыто
            if (!this.isMenuOpen) {
              this.isMenuOpen = !this.isMenuOpen;
              // Фиксируем позицию анти скролла
              disableScroll();
              // Проигрываем анимацию
              this.playMenuAnimation();
            } else {
              // Если открыто
              this.isMenuOpen = !this.isMenuOpen;
              // Убираем фикс скрола
              enableScroll();
              // Проигрываем анимацю уходящую
              this.reverseMenuAnimation();
            }
            break;
        }
      },

      playFirstMenuAnimation() {
        // Анимация первого появление меню
      },

      playMenuAnimation() {
        // Для ПК появяление при hover
        // Для ТАБ появление при нажатии
      },

      reverseMenuAnimation() {
        // Для ПК изчезнование
        // Для ТАБ изчезнование
      },

      calculateMenuFixedPosition() {
        // Вычесляем позиции
        const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
        const screenHeight = window.window.innerHeight;
        // Фиксируем меню или нет
        const isFixed = currentPosition >= 100;
        if (isFixed === this.isMenuFixed) return;
        this.isMenuFixed = isFixed;
        if (this.isMenuFixed) this.animateFixMenu();
        else this.animateRemoveFixMenu();
      },

      animateFixMenu() {
        // Анимация фиксирования

        // const { logo } = this.$refs;
        // logo.style.opacity = 0;
        // logo.style.position = 'fixed';

        // this.$nextTick().then(() => {
        //   logo.style.transition = 'opacity .3s ease';
        //   logo.style.opacity = 1;
        // });

        // Анимация уходящей линии
        this.menuAnimation.reverse();
        // Анимация появление бургера
      },

      animateRemoveFixMenu() {
        // Анимация убирания фиксирования
        // const { logo } = this.$refs;
        // logo.style.opacity = 0;
        // logo.style.transition = 'opacity .2s ease';

        // setTimeout(() => {
        //   logo.style.removeProperty('transition');
        //   logo.style.removeProperty('opacity');
        //   logo.style.removeProperty('position');
        // }, 200);
        // Анимация появление линии
        this.menuAnimation.play();
        // Анимация изчезнование бургера
      },

      createMenuAnimation() {
        const { phone } = this.$refs;
        let links = this.$refs.link;
        const array = [ phone.$el, ...links.map((item) => item.$el).reverse() ];

        return gsap.fromTo(array, {
          opacity: 0,
          translateX: '1rem',
        }, {
          opacity: 1,
          translateX: 0,
          stagger: 0.1,
          duration: 0.3,
          transitionTimingFunction: 'ease',
        });
      }
    },

    mounted() {
      this.menuAnimation = this.createMenuAnimation();
      this.calculateMenuFixedPosition();
      window.addEventListener('scroll', this.calculateMenuFixedPosition.bind(this), {
        capture: true,
        passive: true
      });
    }
  }
</script>

<style lang="scss">
.header-shell {

  // Background gradient
  &::before {
    content: '';
    display: block;
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    transform: translateY(-100%);
    background: linear-gradient(
      to bottom,
      rgba($color-dark, 0.8) 0%,
      rgba($color-dark, 0.65) 25%,
      rgba($color-dark, 0.15) 75%,
      rgba($color-dark, 0) 100%
    );
    height: rem(150);
    @include defaultTransition(opacity, transform);
    transition-duration: .6s;
    z-index: $z-index-header - 1;
  }

  &.is-open {
    &::before {
      transform: none;
      opacity: 1;
    }
  }
}

.header {
  $b: #{&};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-header;
  padding-top: rem(32);
  padding-bottom: rem(40);

  @at-root .is-fixed & {
    pointer-events: none;
    opacity: 1;

    &__menu {
      transform: translateX(#{rem(-80)});
    }

    &__link {
      opacity: 0;
    }
  }

  @at-root .is-open & {
    pointer-events: all;
  }

  &__container {
    display: flex;
  }

  &__menu {
    margin-left: auto;
    display: flex;
    @include defaultTransition(transform);
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
    display: inline-block;
    color: $color-white;
    padding: rem(8) 0; // Область клика

    &:hover {
      #{$b}__text {
        transform: translateY(#{rem(-6)});
        opacity: 0.65;
      }
    }
  }

  &__text {
    display: inline-block;
    @include defaultTransition(opacity, transform);
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
  top: 0;
  left: 0;
  right: 0;
  padding-top: rem(32);
  position: fixed;
  mix-blend-mode: difference;
  z-index: $z-index-header-logo;
  pointer-events: none;

  @at-root .is-open & {
    mix-blend-mode: normal;

    &__burger {
      color: $color-dark;
    }
  }

  &__link {
    pointer-events: all;
    display: inline-block;

    &:hover {
      #{$b}__icon {
        transform: translateY(#{rem(-6)});
        opacity: 0.65;
      }
    }

    // Уменьшаем размер logo link
    @at-root .is-fixed:not(.is-open) & {
      width: rem(32);
    }
  }

  &__icon {
    @include defaultTransition(opacity, transform);
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__burger {
    @include media-breakpoint-up(lg) {
      opacity: 0;
      pointer-events: none;
      @include defaultTransition(opacity);
    }

    @at-root .is-fixed & {
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>
