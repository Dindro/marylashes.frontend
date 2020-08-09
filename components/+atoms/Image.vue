<template>
  <component
    class="image"
    :is="is"
    :src="image.src"
    :srcset="srcset"
    :alt="alt"
    :title="image.title"
  >
  </component>
</template>

<script>
  export default {
    props: {
      image: {
        type: Object,
        required: true,
      }
    },

    computed: {
      is() {
        return this.image.type === 'bg' ? 'div' : 'img';
      },

      alt() {
        return this.image.alt || this.image.caption || 'image';
      },

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
  }
</script>

<style lang="scss" scoped>
.image {

}
</style>
