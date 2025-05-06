<template class="app">
    <div class="container container-input">
        <input v-model="inputValue" placeholder="write" @keydown.enter="generateImage()"/>
        <button :disabled="isLoading" @click="generateImage()">
            <Icon icon="mdi:wand" width="70" height="70" />
        </button>
    </div>
    <div class="container container-image">
        <div v-if="isLoading" class="loader-image"></div>
        <generated-image v-for="(image, index) in images" :key="index" :image="image" @loaded="isLoading = false" :index="index"/>
    </div>
</template>

<script lang="ts" setup>
//TODO обработка ошибок
//TODO сделать что бы хранился промпт в картинке и писался в загрузке
import { ref } from "vue";
import { Icon } from '@iconify/vue';
import GeneratedImage from "./components/GeneratedImage.vue";

const inputValue = ref<string>("");
const images = ref<string[]>([]);
const isLoading = ref<boolean>(false);

const generateImage = () => {
    if (inputValue.value === "" || isLoading.value) return;
    isLoading.value = true;
    const prompt = inputValue.value;
    inputValue.value = "";
    setTimeout(() => {
        fetch("https://model-fast-api-w4du.onrender.com/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json',
            },
            body: JSON.stringify({ prompt })
        }).then(res => res.json().then(data => {
            const img = new Image();
            img.src = data.url;

            img.onload = () => {
                images.value = [data.url, ...images.value];
            };
        })).catch((err) => {
            console.log(err)
            isLoading.value = false;
        })
    }, 200)
}
</script>

<style>
.app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container {
    width: 100%;
    display: flex;
    align-items: center;
}
.container-input {
    height: 100px;
    justify-content: center;
}
.container-input input {
    width: calc(100vw - 100px);
    border: none;
    outline: none;
    height: 100px;
    font-size: 3rem;
    padding-left: 15px;
}
.container-input button {
    height: 100px;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    outline: none;
    border: none;
    color: var(--black);
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .3s;
}
.container-input button:disabled {
    cursor: not-allowed;
    color: var(--grey);
}
.container-image {
    display: flex;
    flex-wrap: wrap;
    height: calc(100dvh - 100px);
    overflow-y: auto;
    gap: 15px;
    padding: 15px;
    justify-content: center;
}
.loader-image {
    width: 400px;
    aspect-ratio: 1;
    flex-shrink: 0;
    background-color: #e0e0e0;
    border-radius: var(--border-md);
    position: relative;
    overflow: hidden;
    animation: show .3s linear;
}
.loader-image::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -100%;
    width: 10%;
    height: 200%;
    background: rgba(var(--white-n), .2);
    animation: move 1s ease-out infinite;
    transform: translateY(-50%) rotate(45deg);
    box-shadow: 0 0 20px 20px rgba(var(--white-n), 0.2);
}
@keyframes move {
    0% {
        left: -200%;
    }
    100% {
        left: 200%;
    }
}
@keyframes show {
    from {
        height: 0;
        opacity: 0;
    }
}
@media (max-width: 850px) {
    .loader-image {
        width: 80vw;
        border-radius: var(--border-md);
    }
}
</style>