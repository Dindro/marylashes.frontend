<template>
  <div class="card-service-list">
    <div class="pt-104 pb-104" v-for="(item, index) in cardServiceList.items" :key="index">
      <card-service :card="item"></card-service>
    </div>
  </div>
</template>

<script>
import CardService from "^/CardService";

export default {
  components: {
    CardService,
  },

  data: () => {
    return {
      cardServiceList: {
        items: [
          {
            name: "Classic",
            price: "1000₽",
            text: "Loream",
            photos: [
              {
                src: "img/cards/lashes-classic-1.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-2.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-3.jpg",
                alt: "lashes",
              },
            ],
            actions: {
              items: [
                {
                  type: "button",
                  text: "Подробнее",
                  color: "outline-dark",
                },
                {
                  type: "button",
                  text: "Записаться онлайн",
                  color: "saphire",
                },
              ],
            },
          },
          {
            type: "reverse",
            name: "Classic",
            price: "1000₽",
            text: "Loream",
            photos: [
              {
                src: "img/cards/lashes-classic-1.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-2.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-3.jpg",
                alt: "lashes",
              },
            ],
            actions: {
              items: [
                {
                  type: "button",
                  text: "Подробнее",
                  color: "outline-dark",
                },
                {
                  type: "button",
                  text: "Записаться онлайн",
                  color: "saphire",
                },
              ],
            },
          },
          {
            type: "cuddle",
            name: "Classic",
            price: "1000₽",
            text: "Loream",
            photos: [
              {
                src: "img/cards/lashes-classic-1.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-2.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-3.jpg",
                alt: "lashes",
              },
            ],
            actions: {
              items: [
                {
                  type: "button",
                  text: "Подробнее",
                  color: "outline-dark",
                },
                {
                  type: "button",
                  text: "Записаться онлайн",
                  color: "saphire",
                },
              ],
            },
          },
          {
            type: "reverse-cuddle",
            name: "Classic",
            price: "1000₽",
            text: "Loream",
            photos: [
              {
                src: "img/cards/lashes-classic-1.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-2.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-3.jpg",
                alt: "lashes",
              },
            ],
            actions: {
              items: [
                {
                  type: "button",
                  text: "Подробнее",
                  color: "outline-dark",
                },
                {
                  type: "button",
                  text: "Записаться онлайн",
                  color: "saphire",
                },
              ],
            },
          },
          {
            type: "full",
            name: "Снятие",
            price: "200₽*",
            text:
              "Классика - это исскуство. <br>Время наращивания занимает<br>чуть более 2 часов. Можно выбрать разные эффекты.",
            photos: [
              {
                src: "img/cards/lashes-classic-1.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-2.jpg",
                alt: "lashes",
              },
              {
                src: "img/cards/lashes-classic-3.jpg",
                alt: "lashes",
              },
            ],
            actions: {
              items: [
                {
                  type: "button",
                  text: "Подробнее",
                  color: "outline-white",
                },
                {
                  type: "button",
                  text: "Записаться онлайн",
                  color: "saphire",
                },
              ],
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
