<template>
    <section class="section calendar">
        <div class="wrapper calendar-wrapper">
            <h1 class="calendar-title">Афиша событий</h1>
            <div class="calendar-container">
                <div class="calendar-grid">
                    <div class="calendar-header">
                        <button @click="prevMonth" :disabled="isFirstMonth">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                fill="none">
                                <path d="M22.7778 10L12.7778 20L22.7778 30" stroke="#232329" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <span>{{ currentMonthFormatted }}</span>
                        <button @click="nextMonth" :disabled="isLastMonth">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                fill="none">
                                <path d="M17.2222 10L27.2222 20L17.2222 30" stroke="#232329" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div class="calendar-grid-wrapper">
                        <div class="calendar-weekdays">
                            <div v-for="day in weekdays" :key="day">{{ day }}</div>
                        </div>
                        <div class="calendar-body">
                            <div v-for="day in days" :key="day"
                                :class="{ 'marked': isMarked(day), 'active': isActive(day) }" class="calendar-day"
                                @click="() => {
                                    toggleActive(day);
                                    slideToMarkedDay(day);
                                }">
                                <span>{{ parseInt(day.split('-')[2]) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="calendar-swiper">
                    <Swiper ref="swiperRef" @swiper="onSwiper" :space-between="20" :modules="[Autoplay, Navigation]"
                        :navigation="{
                            prevEl: '.calendar-swiper-prev',
                            nextEl: '.calendar-swiper-next'
                        }" @slideChange="onSlideChange" :autoplay="{ delay: 3000 }">
                        <div class="swiper-navigation calendar-swiper-navigation">
                            <div class="swiper-prev calendar-swiper-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                    fill="none">
                                    <path d="M22.7778 10L12.7778 20L22.7778 30" stroke="#232329" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div class="swiper-next calendar-swiper-next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                                    fill="none">
                                    <path d="M17.2222 10L27.2222 20L17.2222 30" stroke="#232329" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <SwiperSlide v-for="day in markedDays" :key="day.event">
                            <div class="calendar-swiper-slide-container slide-container">
                                <span class="slide-container-date">{{ formatDate(day.date) }}</span>
                                <span class="slide-container-event">{{ day.event }}</span>
                                <div class="slide-container-bot">
                                    <span class="slide-container-bot-text">
                                        Для предпринимателей
                                    </span>
                                    <NuxtLink to="/" class="base-link">
                                        <span>Подробнее</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14"
                                            height="14">
                                            <path
                                                d="M0.81322 0.812012L13.1876 13.1864M13.1876 13.1864L13.1872 0.812271M13.1876 13.1864L0.81279 13.1866"
                                                stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </NuxtLink>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';


const swiperRef = ref(null);
const swiperInstance = ref(null);

const onSwiper = (swiper) => {
    swiperInstance.value = swiper;
};

console.log(swiperRef.value);

const currentMonth = ref(new Date(2023, 0));
const markedDays = ref([
    {
        date: '2023-01-05',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
    {
        date: '2023-01-10',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
    {
        date: '2023-01-15',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
    {
        date: '2023-02-01',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
    {
        date: '2023-02-14',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
    {
        date: '2023-02-20',
        event: 'МАСТЕР - КЛАСС «5 ПСИХОТИПОВ ПОКУПАТЕЛЕЙ В ФЭШН – ЗНАТЬ И ВЛИЯТЬ! КАКИЕ ТРИГГЕРЫ У ЦЕЛЕВОЙ АУДИТОРИИ ВАШЕГО БРЕНДА?»'
    },
]);
const activeDay = ref('2023-01-05')
const weekdays = ref(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
const monthNames = ['Январь', 'Февраль'];

const currentMonthFormatted = computed(() => {
    const year = currentMonth.value.getFullYear();
    const monthIndex = currentMonth.value.getMonth();
    return `${monthNames[monthIndex]} ${year}`;
});

const days = computed(() => {
    const year = currentMonth.value.getFullYear();
    const month = currentMonth.value.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) =>
        `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
    );
});

const isMarked = (day) => markedDays.value.some(markedDay => markedDay.date === day);
const isActive = (day) => activeDay.value === day;

const slideToMarkedDay = (day) => {
    if (!swiperInstance.value) return;
    const markedDayIndex = markedDays.value.findIndex(markedDay => markedDay.date === day);
    if (markedDayIndex !== -1) {
        swiperInstance.value.slideTo(markedDayIndex);
    }
};

onSwiper((swiper) => {
    slideToMarkedDay('2023-01-05', swiper);
});

const toggleActive = (day) => {
    if (isMarked(day)) {
        activeDay.value = day;
    }
};

const isFirstMonth = computed(() => currentMonth.value.getMonth() === 0);
const isLastMonth = computed(() => currentMonth.value.getMonth() === 1);

const prevMonth = () => {
    if (!isFirstMonth.value) {
        const prevDate = new Date(currentMonth.value);
        prevDate.setMonth(prevDate.getMonth() - 1);
        currentMonth.value = prevDate
    };
};

const nextMonth = () => {
    if (!isLastMonth.value) {
        const nextDate = new Date(currentMonth.value);
        nextDate.setMonth(nextDate.getMonth() + 1);
        currentMonth.value = nextDate
    };
}

const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day} /${month}/${year.slice(2)}`;
};

const onSlideChange = (swiper) => {
    swiperRef.value = swiper;
    const currentIndex = swiper.realIndex;
    const markedDay = markedDays.value[currentIndex];
    activeDay.value = markedDay.date;
};
</script>