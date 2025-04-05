<script setup lang="ts">
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['pageChanged']);

//расчет кол-ва страниц
const pages = computed(() => {
  const pages = [];

  if (props.totalPages === 1) {
    return [1];
  }

  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 3);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

//предыдущая страница
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('pageChanged', props.currentPage - 1);
  }
};

//следующая страница
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('pageChanged', props.currentPage + 1);
  }
};

//нажатие на элемент пагинации
const goToPage = (page: number) => {
  emit('pageChanged', page);
};

watch(() => props.totalPages, (newValue) => {
  console.log(newValue);
});
</script>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-bullet prev-page">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z"
              fill="black" fill-opacity="0.87" />
      </svg>
    </button>
    <span class="pagination-bullet" v-for="page in pages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
    >
      {{ page }}
    </span>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-bullet next-page">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M1.78418 0L7.78418 6L1.78418 12L0.37793 10.5938L4.97168 6L0.37793 1.40625L1.78418 0Z"
              fill="black" fill-opacity="0.87" />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.pagination {
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &-bullet {
    font-size: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $base-gray;
    border-radius: 10px;
    transition: .3s;

    &.active {
      color: #fff;
      background: $base-green;
      transition: .3s;

      &:hover {
        background: $base-green;
      }
    }

    &:hover {
      background: $light-green;
      transition: .3s;
    }
  }
}

.prev-page {
  svg {
    transform: rotate(180deg);
  }
}
</style>