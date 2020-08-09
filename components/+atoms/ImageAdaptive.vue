<template>
  <picture>
     <source
      media="(max-width: {{ devices.md - 1 }}px)"
      :is="is"
      :src="image.src"
      :srcset="srcset"
      :alt="alt"
      :title="image.title"
    />
  </picture>
</template>

<script>
  import { devices } from '@/utils/breakpoints';

  export default {
    data: () => {
      return {
        is: this.image.type === 'bg' ? 'div' : 'img',
        alt: this.image.alt || this.image.caption || 'image',
      }
    },

    computed: {
      srcset() {
        if (!Array.isArray(this.image.srcset)) return;

        let srcset = '';
        this.image.srcset.forEach((item, index) => {
          srcset += item.src;
          if (item.scale && item.scale > 1) {
            srcset += item.scale;
            srcset += 'x';
          }
          if (index < this.image.srcset.lenght - 1) {
            srcset += ', ';
          }
        });

        return srcset;
      },
    },

    props: {
      image: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
