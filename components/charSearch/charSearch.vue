<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const searchTerm = ref('');

const onInput = () => {
  emit('update:modelValue', searchTerm.value);
};
</script>

<template>
  <div class="char-search">
    <input
      type="text"
      placeholder="Search..."
      v-model="searchTerm"
      @input="onInput"
    >
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.char-search {
  max-width: 600px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  input {
    width: 100%;
    height: 46px;
    background: $base-gray;
    padding: 0 15px;
  }
}
</style>