<script setup lang="ts">
const props = defineProps({
  views: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:view']);

const activeView = ref(props.views[0].type);

const setActiveView = (view: object) => {
  activeView.value = view;
  emit('update:view', view);
};

const isActive = (view: object) => {
  return activeView.value === view;
};
</script>

<template>
  <div class="view-toggle">
    <button
      class="view-toggle__item"
      v-for="(view, index) in views"
      :key="index"
      @click="setActiveView(view.type)"
      :class="{ active: isActive(view.type) }"
    >
      {{ view.label }}
    </button>
  </div>
</template>


<style scoped lang="scss">
@import '@/assets/styles/variables';

.view-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  @media screen and (max-width: $tablet) {
    gap: 10px;
  }

  &__item {
    width: 100px;
    padding: 15px 0;
    background: $base-gray;
    border-radius: 10px;
    transition: .3s;

    &:hover {
      background: $light-green;
      transition: .3s;
    }

    &.active {
      color: white;
      background: $base-green;
      transition: .3s;
    }
  }
}
</style>