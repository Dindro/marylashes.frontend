<template>
  <div>
    <div>
      <div class="container">
        <about-block></about-block>
      </div>
    </div>
    <div>
      <btn :button="{ text: 'Привет', to: '/articles', color: 'outline-dark'}"></btn>
      <h1 class="title">
        marylashes.frontend
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '+/Button';

import AboutBlock from '&/AboutBlock';
export default {
  components: {
    Btn
  }
}
</script>

<style>

</style>
