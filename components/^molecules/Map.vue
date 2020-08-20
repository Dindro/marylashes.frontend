<template>
  <div class="map" ref="map">

  </div>
</template>

<script>
import { loadYmap } from 'vue-yandex-maps';
import { getSettings } from '@/utils/map';

export default {
  data: () => ({
    instance: null,
  }),

  props: {
    map: {
      center: Array,
      points: {
        type: Array,
        default: [],
      },
      zoom: Number,
      controls: {
        type: Array,
        default: [],
      }
    }
  },

  methods: {
    getPlacemarks(points) {
      const icon = require('assets/icons/24/map-saphire.svg?data');
      const placemarks = points.map((point) => {
        return new ymaps.Placemark(point.coords, null, {
          iconLayout: 'default#image',
          iconImageHref: icon,
          iconImageSize: [32, 32],
          iconImageOffset: [-16, -32]
        });
      });

      return placemarks;
    },

    addPlacemarks(placemarks) {
      if (!placemarks && !placemarks.length) return;
      placemarks.forEach((placemark) => this.instance.geoObjects.add(placemark));
    }
  },

  async mounted() {
    const settings = getSettings();

    await loadYmap(settings);

    this.instance = new ymaps.Map(this.$refs.map, {
      center: this.map.center,
      zoom: this.map.zoom,
      controls: this.map.controls,
    });

    const placemarks = this.getPlacemarks(this.map.points);
    this.addPlacemarks(placemarks);
  },

  beforeDestroy() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  }
}
</script>

<style lang="scss">
.map {
  height: 100%;
  width: 100%;

  [class$=ground-pane] {
    filter: grayscale(1);
    mix-blend-mode: difference;
  }
}
</style>
