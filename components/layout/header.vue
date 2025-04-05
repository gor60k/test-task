<script setup lang="ts">
interface NavLink {
  id: number;
  path: string;
  title: string;
}

const links: NavLink[] = [
  {
    id: 1,
    path: '/',
    title: 'Home'

  },
  {
    id: 2,
    path: '/characters',
    title: 'Characters',
  },
];
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <div class="header-logo"></div>
      <nav class="header-nav">
        <ul class="header-nav__list">
          <NuxtLink v-for="link in links" :key="link.id" class="header-nav__list-item" :to="link.path">
            {{ link.title }}
          </NuxtLink>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.header {
  width: 100%;
  display: block;

  &-wrapper {
    max-width: 1300px;
    padding: 20px 0;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;

    @media screen and (max-width: $laptop) {
      max-width: 800px;
    }

    @media screen and (max-width: $tablet) {
      max-width: 500px;
    }

    @media screen and (max-width: $mobile) {
      max-width: 300px;
    }
  }

  &-nav {

    &__list {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }

  }
}
</style>