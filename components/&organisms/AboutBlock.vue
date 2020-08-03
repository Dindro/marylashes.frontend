<template>
  <div class="about">
    <div class="about__content">
      Фото
      <p class="about__title">«Привет, меня зовут Мария Ижуткина, я лучший lasheмейкер в городе и я подчеркну твою индвидуальность» </p>
      Социальные сети
    </div>
    <div class="about__facts">
      <factoid :factoid="{ text: 'aa' }"></factoid>
    </div>
  </div>
</template>

<script>
  import Factoid from '+/Factoid';
  export default {
    components: {
      Factoid,
    }
  }
</script>

<style lang="scss" scoped>

</style>
