<template>
    <main class="home-page page">
        <section class="section form-section">
            <div class="wrapper form-section-wrapper">
                <div class="form-section-info">
                    <h1 class="form-section-info-title">
                        Поддержка малого бизнеса
                    </h1>
                    <p class="form-section-info-subtitle">
                        Комплексная поддержка предпринимателей Краснодарского края
                    </p>
                    <div class="home-page-controls">
                        <button class="form-section-btn base-btn" @click="openModal">
                            Оставить заявку
                        </button>
                        <div class="swiper-controls">
                            <div class="swiper-pagination">
                                <span class="current-slide">
                                    {{ `0${activeIndex + 1}` }}
                                </span>
                                <div class="swiper-scrollbar-container">
                                    <div ref="swiperScrollbar" class="swiper-scrollbar"></div>
                                </div>
                                <span class="all-slides">
                                    {{ `0${slides.length}` }}
                                </span>
                            </div>
                            <div class="swiper-navigation">
                                <div class="swiper-prev home-swiper-prev">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                        fill="none">
                                        <path d="M22.7778 10L12.7778 20L22.7778 30" stroke="#232329" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div class="swiper-next home-swiper-next">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                        fill="none">
                                        <path d="M17.2222 10L27.2222 20L17.2222 30" stroke="#232329" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-page-swiper-container">
                    <Swiper ref="swiperRef" @swiper="onSwiper" @slide-change="slideAnimation"
                        :scrollbar="{ el: '.swiper-scrollbar' }" :navigation="{
                            prevEl: '.home-swiper-prev',
                            nextEl: '.home-swiper-next'
                        }" :modules="[Scrollbar, Navigation, Autoplay]" class="home-page-swiper" :autoplay="{
                            delay: 3000,
                        }" :slides-per-view="2" :space-between="20" :breakpoints="breakpoints">
                        <SwiperSlide class="home-page-swiper-slide" v-for="slide in slides" :key="slide.img">
                            <NuxtImg :src="`/images/${slide.img}.png`" />
                            <div class="home-page-swiper-slide-info">
                                <h3>{{ slide.text }}</h3>
                                <NuxtLink to="/" class="base-link">
                                    <span>Подробнее</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14">
                                        <path
                                            d="M0.81322 0.812012L13.1876 13.1864M13.1876 13.1864L13.1872 0.812271M13.1876 13.1864L0.81279 13.1866"
                                            stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </NuxtLink>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <LayoutModal :modalOpen="modalOpen" @closeModal="handleCloseModal" />
        </section>
        <LayoutCalendar />
    </main>
</template>

<script lang="ts" setup>
import type Swiper from 'swiper';
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { ref } from 'vue';
import 'swiper/css/scrollbar';

const modalOpen = ref<boolean>(false);

function openModal() {
    modalOpen.value = true;
}

const handleCloseModal = () => {
    modalOpen.value = false;
};

interface Slide {
    img: string;
    text: string;
}

const breakpoints = {
    320: {
        slidesPerView: 1
    },
    321: {
        slidesPerView: 1.2
    },
    769: {
        slidesPerView: 1.5
    },
    1025: {
        slidesPerView: 2
    }
}

const slides = ref<Slide[]>([
    {
        img: 'slide-image1',
        text: 'Школа молодого предпринимателя — Бизнес молодых'
    },
    {
        img: 'slide-image2',
        text: 'Поддержка самозанятых'
    },
    {
        img: 'slide-image3',
        text: 'Тоже поддержка самозанятых'
    },
    {
        img: 'slide-image1',
        text: 'Школа молодого предпринимателя — Бизнес молодых'
    },
    {
        img: 'slide-image2',
        text: 'Поддержка самозанятых'
    },
]);

const swiperRef = ref<Swiper | null>(null);
const activeIndex = ref<number>(0);

const onSwiper = (swiper: Swiper) => {
    swiperRef.value = swiper;
}

const slideAnimation = (swiper: Swiper) => {
    activeIndex.value = swiper.activeIndex;
    const windowWidth = window.outerWidth;

    swiper.slides.forEach((slide, index) => {
        if (windowWidth > 320) {
            if (index === activeIndex.value) {
                slide.style.height = "465px";
                slide.style.transition = ".5s";
            } else {
                slide.style.height = "415px";
                slide.style.transition = ".5s";
            }
        }
    });
}
</script>

<style scoped lang="scss">
@import '/assets/scss/vars.scss';

.home-page {
    &-swiper-container {
        width: 60%;
    }

    &-swiper {
        height: 465px;

        &-slide {
            position: relative;
            border-radius: 20px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &-info {
                position: absolute;
                bottom: -30px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 30px;
                align-items: flex-start;
                justify-content: flex-start;
                transition: .5s;

                h3 {
                    color: $base-white;
                }
            }

            &.swiper-slide-active {

                .home-page-swiper-slide-info {
                    bottom: 20px;
                    transition: .5s;
                }
            }
        }
    }
}

.wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    gap: 30px;
}

.form-section {

    margin-bottom: 130px;

    &-info {
        width: 40%;

        h1 {
            font-size: 46px;
            font-weight: 600;
            max-width: 415px;
            margin-bottom: 15px;
        }

        p {
            font-size: 20px;
            margin-bottom: 40px;
        }
    }

    &-btn {
        margin-bottom: 50px;
    }
}

.swiper {
    max-width: 800px;
}

.swiper-controls {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .swiper-scrollbar-container {
        position: relative;
        width: 100px;
        height: 1px;

        .swiper-scrollbar {
            height: 1px;
            top: 0;
            left: 0;
        }
    }
}

.swiper-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 160px;
    width: 100%;
    position: static;

    span {
        font-size: 20px
    }
}

.swiper-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.swiper-prev,
.swiper-next {
    cursor: pointer;

    svg {
        path {
            transition: .3s
        }
    }

    &:hover {
        svg {
            path {
                stroke: $base-orange;
                transition: .3s
            }
        }
    }
}

@media screen and (max-width: 1024px) {
    .form-section {
        .wrapper {
            max-width: 100%;
            padding-left: 92px;
            gap: 20px;
        }

        &-info {
            h1 {
                font-size: 32px;
            }

            p {
                font-size: 16px;
            }
        }
    }
}

@media screen and (max-width: 320px) {
    .home-page {

        &-swiper-container {
            width: 100%;
        }

        &-swiper {

            height: 300px;

            &-slide {
                max-height: 300px;
            }
        }

        &-controls {
            display: flex;
            flex-direction: column-reverse;
            gap: 30px;

            .base-btn {
                width: 100%;
                margin-bottom: 0;
            }
        }

    }

    .form-section {
        margin-bottom: 60px;

        .wrapper {
            flex-direction: column-reverse;
            padding-left: 0;
            max-width: 280px
        }

        &-info {
            width: 100%;

            &-title,
            &-subtitle {
                display: none;
            }
        }
    }
}
</style>
