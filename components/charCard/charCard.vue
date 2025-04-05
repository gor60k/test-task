<script setup lang="ts">
defineProps({
  charName: {
    type: String,
    default: '',
  },
  charImage: {
    type: String,
    default: '',
  },
  charId: {
    type: String,
    default: '',
  },
  charOrigin: {
    type: Object,
    default: () => {
    },
  },
});
</script>

<template>
  <NuxtLink class="char-card" :to="`characters/${charId}`">
    <div class="char-card__wrapper">
      <div class="char-card__image">
        <img :src="charImage" :alt="charName" />
      </div>
      <div class="char-card__info">
        <div class="char-card__info-name">
          <span>{{ charName }} : {{ charOrigin.name }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.char-card {
  background: $base-gray;
  padding: 10px;
  border-radius: 10px;

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 30px;

    @media screen and (max-width: $laptop) {
      gap: 10px;
    }
  }

  &__image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    max-height: 200px;
    overflow: hidden;

    @media screen and (max-width: $laptop) {
      max-height: 120px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    &-name {
      font-size: 16px;

      @media screen and (max-width: $laptop) {
        font-size: 12px;
      }
    }
  }

  &.list-item {

    .char-card__wrapper {
      flex-direction: row;
      gap: 10px;
      align-items: start;
    }

    .char-card__image {
      max-width: 100px;
      max-height: 100px;
    }
  }
}
</style>