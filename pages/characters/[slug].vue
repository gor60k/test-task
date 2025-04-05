<script setup lang="ts">
import { useCharacters } from '~/store/useCharacter';
import type { Character } from '@/types/character';

defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

const route = useRoute();
const routeSlug = route.params.slug;

const characterStore = useCharacters();

const character = ref<Character>();

const fetchCharacter = async () => {
  await characterStore.getCharacterById(routeSlug);
  character.value = characterStore.character.value;
  console.log(character.value);
};

const fetchEpisodes = async () => {

};

onMounted(async () => {
  await fetchCharacter();
});
</script>

<template>
  <div class="char-detail">
    <div class="char-detail__wrapper wrapper">
      <img :src="character?.image" :alt="character?.name">
      <div class="char-detail__info">
        <h1 class="char-detail__info-name">{{ character?.name }}</h1>
        <div class="char-detail__info-lists">
          <div class="personal-data__list data-list">
            <div class="data-list__header"><span>Personal data</span></div>
            <ul class="data-list__ul">
              <li class="data-list__ul-item">
                <span class="key">Status</span>
                <span class="value">{{ character?.status }}</span>
              </li>
              <li class="data-list__ul-item">
                <span class="key">Gender</span>
                <span class="value">{{ character?.gender }}</span>
              </li>
            </ul>
          </div>
          <div class="personal-data__list data-list">
            <div class="data-list__header"><span>Location</span></div>
            <ul class="data-list__ul">
              <li class="data-list__ul-item">
                <span class="value">{{ character?.location.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.char-detail {

  &__wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 80px;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
  }

  &__info {
    width: 100%;

    &-name {
      font-size: 48px;
      font-weight: 600;
      margin-bottom: 30px;
    }

    &-lists {
      display: flex;
      column-gap: 20px;
    }
  }

  .data-list {
    max-width: 388px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 16px 0;
      background: $base-gray;
    }

    &__ul {
      width: 100%;

      &-item {
        padding: 16px 0;
        border-bottom: 1px solid $base-gray;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &:nth-child(1) {
      .data__list-ul {
        &-item {
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }

    &:nth-child(2) {
      .data__list-ul {
        &-item {
          position: relative;
          padding-left: 25px;
          border-bottom: 0;
        }
      }
    }
  }
}
</style>