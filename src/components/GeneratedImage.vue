<template>
    <img
        :src="image"
        alt=""
        class="image"
        @load="emit('loaded')"
        @click="isShowing = true"
    >
    <div class="image-container" v-if="isShowing">
        <div class="button-container">
            <button @click="downloadImageBlob(image, `generated-image`)">
                <Icon icon="material-symbols:download" width="24" height="24" class="icon-download"/>
            </button>
            <button @click="hideImage">
                <Icon icon="material-symbols:close" width="24" height="24" />
            </button>
        </div>
        <img
            :src="image"
            alt=""
            class="big-image"
            @load="emit('loaded')"
        >
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {ref} from "vue";
import gsap from "gsap";

defineProps<{
    image: string;
}>();

const emit = defineEmits<{
    (e: 'loaded'): void;
}>();

const isShowing = ref<boolean>(false);

const downloadImageBlob = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
};

const hideImage = () => {
    gsap.to(".image-container", {
        opacity: 0,
        duration: .3,
        onComplete: () => {
            isShowing.value = false
        }
    })
}
</script>

<style scoped>
.image {
    width: 400px;
    aspect-ratio: 1;
    flex-shrink: 0;
    object-fit: contain;
    border-radius: var(--border-md);
    cursor: pointer;
    transition: transform .3s;
}
.image:hover {
    transform: scale(1.01);
}
.image-container {
    z-index: 9999;
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(15px);
    background: rgba(0, 0, 0, 0.8);
    animation: show .3s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image-container img {
    width: 600px;
    aspect-ratio: 1;
    transition: width .3s, height .3s;
}
.button-container {
    position: fixed;
    right: 15px;
    top: 15px;
    display: flex;
    gap: 15px;
}
.button-container button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    background: inherit;
    outline: none;
    border: none;
    border-radius: var(--border-sm);
}
.button-container button svg {
    color: var(--white);
}
@keyframes show {
    from {
        opacity: 0;
        backdrop-filter: blur(0);
        background: rgba(0, 0, 0, 0);
    }
}
@media (max-width: 850px) {
    .image {
        width: 60%;
        border-radius: var(--border-md);
    }
}
@media (max-width: 900px) {
    .image-container img {
        width: 60vw;
    }
}
</style>