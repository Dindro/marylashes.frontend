<template>
  <div class="header-shell" :class="{ 'is-open': isMenuOpen, 'is-fixed': isMenuFixed }">

    <div class="header-logo" ref="logo" data-gap>
      <div class="header-logo__container container">
        <tag-link class="header-logo__link" :link="header.logo">
          <logo :small="isMenuFixed && !isMenuOpen" class="header-logo__icon"></logo>
        </tag-link>
        <burger class="header-logo__burger" :class="{ 'is-visible': isBurgerVisible }" @click.native="openMenu" @mouseenter.native="openMenu" :isOpen="isBurgerOpen"></burger>
      </div>
    </div>

    <div class="header" :class="[ color && `header--${color}` ]" ref="header" data-scroll-lock-scrollable>
      <div class="header__container container">
        <div class="header__menu" data-gap>
          <ul class="header__list">
            <li v-for="(item, index) in header.items" :key="index">
              <span class="header__link-shell" ref="link">
                <tag-link class="header__link text-default" :link="item">
                  <span class="header__text">
                    {{ item.text }}
                  </span>
                </tag-link>
              </span>
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
	import throttle from 'raf-throttle';

  export default {
    components: {
      TagLink,
      Logo,
      Burger,
    },

    data: () => ({
      isMenuFixed: false,
      isMenuOpen: false,
      isBurgerVisible: false, // Добавляет класс is-visible
	  menuAnimation: null,
	  color: 'default',

      leaveHeaderHandler: null,     // fn - callback при уходе из меню
    }),

    computed: {
      ...mapState([
        'header',
      ]),

      isBurgerOpen() {
        return process.client && !isDesktop() && this.isMenuOpen;
      }
    },


    methods: {
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
            this.isBurgerVisible = false;

            // Проигрываем анимацию
            this.playMenuAnimation();

            // Создаем handler
            const closeMenuHandler = () => {
              this.isMenuOpen = false;
              this.reverseMenuAnimation();
            };

            // Слушаем leave событие
            this.$refs.header.addEventListener('mouseleave', this.leaveHeaderHandler = closeMenuHandler.bind(this), { once: true });
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
        this.menuAnimation.play();
      },

      playMenuAnimation() {
        // Для ПК появяление при hover
        this.menuAnimation.play();
      },

      reverseMenuAnimation() {
        // Для ПК изчезнование
        this.menuAnimation.reverse();
        this.menuAnimation.then(() => {
          this.isBurgerVisible = true;
        });
      },

      animateFixMenu() {
        // Анимация фиксирования

        // Анимация уходящей линии
        this.menuAnimation.reverse();
        // Анимация появление бургера
        this.menuAnimation.then(() => {
          this.isBurgerVisible = true;
        });
      },

      animateRemoveFixMenu() {
        // Анимация убирания фиксирования

        // Анимация появление линии
        this.menuAnimation.play();
        // Анимация изчезнование бургера
        this.isBurgerVisible = false;
        // Убираем handler c шапки
        this.$refs.header.removeEventListener('mouseleave', this.leaveHeaderHandler);
        // Закрываем меню
        if (isDesktop()) this.isMenuOpen = false;
      },

      createMenuAnimation() {
        const { phone, link: links } = this.$refs;
        const array = [ phone.$el, ...links.reverse() ];

        return gsap.fromTo(array, {
          opacity: 0,
          translateX: '1.5rem',
        }, {
          opacity: 1,
          translateX: 0,
          stagger: 0.1,
          duration: 0.3,
          delay: 0.2,
        });
	  },

		updateColor(to, from) {
			const { routeColors, routeColorDefault } = this.header;
			let color = routeColorDefault || 'default';

			if (routeColors && routeColors.length) {
				const routeColorTo = routeColors.find(item => item.name === to.name);
				if (routeColorTo?.color) {
					color = routeColorTo.color;
				}
			}

			this.color = color;
		}
    },

    mounted() {
      this.menuAnimation = this.createMenuAnimation();
      this.calculateMenuFixedPosition();

	 const calculateMenuFixedPositionThrottle = throttle(this.calculateMenuFixedPosition);
      window.addEventListener('scroll', calculateMenuFixedPositionThrottle, {
        passive: true,
	  });
	  this.$on('hook:beforeDestroy', calculateMenuFixedPositionThrottle);
	},

	watch: {
		$route: {
			handler: 'updateColor',
			immediate: true,
		}
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

    @include media-breakpoint-down(md) {
      content: none;
    }
  }

  &.is-open {
    &::before {
      transform: none;
      opacity: 1;
    }
  }

	&:not(.is-fixed) {
		.header--default {
			@include media-breakpoint-up(lg) {
				.header__link {
					color: $color-dark;
				}
			}
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

  @include media-breakpoint-down(md) {
    padding-bottom: 0;
    overflow-y: auto;
    height: $height-screen;
    transform: translateX(100%);
    transition: transform .7s ease-in-out;
    background-color: rgba($color-white, 0.95);
    backdrop-filter: blur(5px);
  }

  @at-root .is-fixed & {
    pointer-events: none;
    opacity: 1;

    &__link-shell {
      opacity: 0;
    }
  }

  @at-root .is-open & {
    pointer-events: all;

    @include media-breakpoint-down(md) {
      transform: none;
    }
  }

  &__container {
    display: flex;

    @include media-breakpoint-down(md) {
      height: 100%;
    }
  }

  &__menu {
    margin-left: auto;
    display: flex;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0;
      padding-top: rem(104);
      padding-bottom: rem(104);
    }

    @include media-breakpoint-down(sm) {
      padding-top: rem(64);
      padding-bottom: rem(64);
    }
  }

  &__list {
    display: flex;
    color: $color-white;
    list-style: none;
    margin: 0;
    padding: 0;

    li:not(:first-child) {
      margin-left: rem(40);

      @include media-breakpoint-down(md) {
        margin-left: 0;
        margin-top: rem(16);
      }

      @include media-breakpoint-down(sm) {
        margin-top: rem(24);
      }
    }

    @include media-breakpoint-down(md) {
      display: block;
    }
  }

  &__link-shell {
	display: inline-block;
	will-change: transform, opacity;
  }

  &__link {
    display: inline-block;
    color: $color-white;
	padding: rem(8) 0; // Область клика

    @include media-breakpoint-down(md) {
      font-size: rem(26);
      color: $color-dark;
    }

    @include media-breakpoint-down(sm) {
      font-size: rem(20);
      padding: 0;
    }

  }

  	a#{$b}__link {
		&:hover {
			#{$b}__text {
				opacity: 0.65;

				@include media-breakpoint-up(lg) {
					transform: translateY(#{rem(-6)});
				}

				@include media-breakpoint-down(md) {
					transform: translateX(1em);
				}
			}
		}
	}

  &__text {
    display: inline-block;
    @include defaultTransition(opacity, transform, color);
  }

  &__contacts {
    margin-left: rem(40);

    @include media-breakpoint-down(md) {
      margin-top: rem(48);
      margin-left: 0;
      opacity: 0.65;
    }
  }

  &__mail {
    @include media-breakpoint-up(lg) {
      display: none;
    }
  }

  &__phone,
  &__mail {
    @include media-breakpoint-down(md) {
      font-size: rem(18);
      display: block;
      padding: rem(8) 0;
      color: $color-dark;

      @include defaultTransition(opacity);

      &:hover {
        opacity: 0.65;
      }

      #{$b}__text {
        transform: none !important;
      }
    }

    @include media-breakpoint-down(sm) {
      font-size: rem(14);
    }
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

  @include media-breakpoint-only(sm) {
    padding-top: rem(16);
  }

  @at-root .is-open & {
    @include media-breakpoint-up(lg) {
      mix-blend-mode: normal;

      &__burger {
        color: $color-dark;
      }
    }
  }

	&__link {
		pointer-events: none;
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

  a#{$b}__link {
		pointer-events: all;
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
      transform: translateX(#{rem(32)});
      @include defaultTransition(opacity, transform);

      &.is-visible {
        pointer-events: all;
        transform: none;
        opacity: 1;
      }
    }
  }
}
</style>
