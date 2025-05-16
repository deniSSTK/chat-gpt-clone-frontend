<template>
    <img
        :src="image"
        alt=""
        class="image"
        @load="emit('loaded')"
        @click="isShowing = true"
    >
    <FullScreenImage v-model="isShowing" :image="image" :is-showing="isShowing"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import FullScreenImage from "./FullScreenImage.vue";

defineProps<{
    image: string;
    isShowingFirstValue?: boolean;
}>();

const emit = defineEmits<{
    (e: 'loaded'): void;
}>();

const isShowing = ref<boolean>(false);
</script>