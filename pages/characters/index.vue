<script setup lang="ts">
import { useCharacters } from '@/store/useCharacter';
import type { Character } from '@/types/character';
import charSearch from '@/components/charSearch/charSearch.vue';

//фетч списка персонажей
const characterStore = useCharacters();

const currentPage = ref(1);
const totalPages = ref(0);
const totalCount = ref(0);
const limit = ref(10);
const searchTerm = ref('');

const characters = ref<Character[]>([]);

const fetchCharacters = async () => {
  await characterStore.getAllCharacters(currentPage.value, limit.value, searchTerm.value);
  characters.value = characterStore.characters.value;
  console.log(characters.value);
  totalCount.value = characterStore.totalCount.value;
  totalPages.value = Math.ceil(totalCount.value / limit.value);
};

const updateSearchTerm = (term: string) => {
  searchTerm.value = term;
  fetchCharacters();
};

//логика для смены вида списка
const viewOptions = ref([
  { label: 'Сетка', type: 'grid' },
  { label: 'Список', type: 'list' },
]);

const activeView = ref(viewOptions.value[0].type);

const updateActiveView = (view: string) => {
  activeView.value = view;
};

//хендлер для работы пагинации
const handlePageChanged = (newPage: number) => {
  currentPage.value = newPage;
  fetchCharacters();
};

onMounted(async () => {
  await fetchCharacters();
});
</script>

<template>
  <section class="catalog">
    <div class="catalog-wrapper wrapper">
      <div class="catalog-filters">
        <viewToggle :views="viewOptions" @update:view="updateActiveView" />
        <charSearch @update:modelValue="updateSearchTerm" />
      </div>
      <div class="catalog-list" :class="activeView === 'grid' ? 'is-grid' : 'is-list'">
        <charCard
          v-for="character in characters"
          :key="character.id"
          :char-name="character.name"
          :char-image="character.image"
          :char-id="character.id"
          :char-origin="character.origin"
          :class="activeView === 'grid' ? 'grid-item' : 'list-item'"
        />
      </div>
      <pagination
        :total-pages="totalPages"
        :limit="limit"
        :current-page="currentPage"
        @pageChanged="handlePageChanged"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.catalog {
  width: 100%;
  height: 100%;

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }

  &-filters {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
      gap: 10px;
    }
  }

  &-list {
    width: 100%;
    height: 100%;

    &.is-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px;
      
      @media screen and (max-width: $tablet) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: $mobile) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    }

    &.is-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>