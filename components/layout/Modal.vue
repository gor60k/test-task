<template>
    <div class="modal-overflow" :class="modalOpen ? 'open' : ''">
        <div class="modal">
            <div class="modal-head">
                <button class="modal-cross" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M24 8L8 24" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M8 8L24 24" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <form @submit.prevent="validateForm" class="modal-form">
                <h1 class="modal-form-title">Заявка на оказание услуги</h1>

                <div class="modal-form-group">
                    <input type="text" id="name" v-model="formData.name" placeholder="ФИО*" />
                    <span v-if="errors.name" class="error">{{ errors.name }}</span>
                </div>

                <div class="modal-form-group">
                    <input type="tel" id="phone" v-model="formData.phone" placeholder="Телефон*" />
                    <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                </div>

                <div class="modal-form-group">
                    <input type="text" id="email" v-model="formData.email" placeholder="E-mail*" />
                    <span v-if="errors.email" class="error">{{ errors.email }}</span>
                </div>

                <div class="modal-form-group">
                    <div class="modal-select-group">
                        <input type="text" v-model="selectedService" :class="{ 'dropdown-open': showDropdown }"
                            :placeholder="selectedService || 'Выберите услугу*'" />
                        <button :class="iconState ? 'active' : ''" class="modal-selet-open" @click.prevent="() => {showDropdown = !showDropdown; setIconState()}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M6 10.3334L12 16.3334L18 10.3334" stroke="#232329" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <ul v-if="showDropdown" class="dropdown-list">
                        <li v-for="(service, index) in services" :key="index" @click.prevent="selectService(service)">
                            {{ service }}
                        </li>
                    </ul>
                    <span v-if="errors.service" class="error">{{ errors.service }}</span>
                </div>

                <div class="modal-form-group">
                    <textarea v-model="formData.comment" placeholder="Комментарий"></textarea>
                </div>

                <div class="modal-form-politics-checkbox">
                    <input v-model="isChecked" type="checkbox" id="subscribeCheckbox" name="subscribe">
                    <div class="custom-checkbox"></div>
                    <label for="subscribeCheckbox">
                        Я даю свое согласие Фонду развития бизнеса Краснодарского края на обработку моих персональных
                        данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных»,
                        на условиях и для целей, определенных <a
                            href="https://policies.google.com/privacy?hl=ru#infochoices">Политикой
                            конфиденциальности</a>
                    </label>
                </div>

                <button :disabled="!isChecked" :class="{ 'disabled-button': !isChecked }" type="submit"
                    class="base-btn">Оставить заявку</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const iconState = ref<boolean>(false);

const setIconState = () => {
    iconState.value = !iconState.value;
}

defineProps({
    modalOpen: Boolean
})

const emit = defineEmits(['closeModal']);

interface FormData {
    name: string;
    phone: string;
    email: string;
    comment: string;
}

interface Errors {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
}

const formData = ref<FormData>({
    name: '',
    phone: '',
    email: '',
    comment: '',
});

const selectedService = ref<string>('');
const showDropdown = ref<boolean>(false);
const services = ref<string[]>(['Услуга 1', 'Услуга 2', 'Услуга 3']);
const errors = ref<Errors>({});
const isChecked = ref<boolean>(false);

function selectService(service: string) {
    selectedService.value = service;
    showDropdown.value = false;
}

const namePattern = /^[А-Яа-яЁё\s-]+$/;
const phonePattern = /^\+?[7-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = () => {
    errors.value = {};

    if (!formData.value.name) {
        errors.value.name = 'Это поле обязательно для заполнения';
    } else if (!namePattern.test(formData.value.name)) {
        errors.value.name = 'ФИО должно содержать только русские буквы';
    }

    if (!formData.value.phone) {
        errors.value.phone = 'Это поле обязательно для заполнения';
    } else if (!phonePattern.test(formData.value.phone)) {
        errors.value.phone = 'Введите корректный номер телефона';
    }

    if (!formData.value.email) {
        errors.value.email = 'Это поле обязательно для заполнения';
    } else if (!emailPattern.test(formData.value.email)) {
        errors.value.email = 'Введите корректный адрес электронной почты';
    }

    if (!selectedService.value) {
        errors.value.service = 'Выберите из списка';
    }

    if (Object.keys(errors.value).length === 0) {
        submitForm();
    }
};

const submitForm = () => {
    console.log('Форма успешно отправлена:', formData.value);

};

const closeModal = () => {
    emit('closeModal');
    errors.value = {};
}
</script>