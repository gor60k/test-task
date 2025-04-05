<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <span>Всем привет, это мое тестовое задание.</span>
    <span>В приложении есть три страницы: Эта страница, страница со всеми персонажами, детальная страница каждого персонажа.</span>
    <span>Приложение сделано с использованием Nuxt 3, Axios, Pinia.</span>

    <span>На странице со всеми персонажами реализован вывод персонажей, пагинация, переключение вида списка и поиск по
      свойствам персонажей
    </span>

    <span>вот официальная документация <a href="https://rickandmortyapi.com/documentation" target="_blank">апишки</a></span>

    <span>поиск персонажей осуществлен по этим свойствам</span>
    <span>name: filter by the given name.</span>
    <span>status: filter by the given status (alive, dead or unknown).</span>
    <span>species: filter by the given species.</span>
    <span>type: filter by the given type.</span>
    <span>gender: filter by the given gender (female, male, genderless or unknown).</span>
  </div>
</template>

<style scoped>
a {
  color: red;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
}
</style>