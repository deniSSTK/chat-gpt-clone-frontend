<template>
    <div class="error-container">
        <div
            v-for="(error) in errors"
            :key="error.id"
            class="error-message"
            @animationend="removeError(error.id)"
        >
            {{ error.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import useErrorStore from "../../use/useErrorStore";

const { errors } = useErrorStore();

const removeError = (id: number) => {
    const index = errors.findIndex((error) => error.id === id);
    if (index !== -1) errors.splice(index, 1);
};
</script>

<style scoped>
.error-container {
    position: fixed;
    top: 15px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 9999;
    overflow-y: auto;
    overflow-x: hidden;
    width: fit-content;
}

.error-message {
    width: 200px;
    height: 50px;
    font-size: var(--font-md);
    background-color: var(--red);
    color: var(--white);
    padding: 10px;
    border-radius: 5px;
    opacity: 1;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    animation: error-animation 4s;
    margin-right: 15px;
}

@keyframes error-animation {
    0%, 100% {
        opacity: 0;
        transform: translateX(100%);
    }
    10%, 90% {
        opacity: 1;
        transform: translateX(0%);
    }
}
</style>
