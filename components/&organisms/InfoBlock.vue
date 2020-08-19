<template>
  <div class="info">
    <div class="info__content">
      <logo class="info__logo" color="dark"></logo>
      <h2 class="info__title" v-html="info.title"></h2>
      <socials class="info__socials" :socials="info.socials"></socials>
    </div>
    <div class="info__actions">
      <actions :actions="Object.assign(info.actions, { column: true })"></actions>
    </div>
  </div>
</template>

<script>
import Socials from '^/Socials';
import Actions from '^/Actions';
import Logo from '+/Logo';

export default {
  components: {
    Socials,
    Actions,
    Logo,
  },
  props: {
    info: {
      title: String,
      socials: Object,
      actions: Object,
    },
  },
};
</script>

<style lang="scss">
.info {
  @include media-breakpoint-up(lg) {
    display: flex;
    align-items: flex-end;
  }

  &__content {
    flex: 2;
  }

  &__actions {
    flex: 1;

    @include media-breakpoint-up(lg) {
      padding-bottom: rem(16);
    }

    @include media-breakpoint-only(md) {
      margin-top: rem(48);

      .actions {
        flex-direction: row;
      }
    }

    @include media-breakpoint-down(sm) {
      margin-top: rem(24);
    }
  }

  &__logo {
    margin-bottom: rem(56);

    @include media-breakpoint-down(sm) {
      margin-bottom: rem(24);
    }
  }

  &__title {
    @include h2;
  }

  &__socials {
    margin-top: rem(24);

    @include media-breakpoint-down(sm) {
      margin-bottom: rem(16);
    }
  }
}
</style>
