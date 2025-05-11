<template>
    <div class="page-container">
        <div class="auth-container">
            <span
                class="title"
            >
                Log In
            </span>
            <input
                class="input-auth"
                placeholder="input email"
                v-model="emailRef"
            >
            <input
                class="input-auth"
                placeholder="input password"
                v-model="passwordRef"
            >
            <button
                class="button-auth"
                :disabled="
                !validator.isEmail(emailRef)
                || passwordRef.length < 8"
            >
                log in
            </button>
            <a href="/sign-up">Don't have an account yet?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../css/auth.css';
import {ref} from 'vue'
import validator from 'validator'

const emailRef = ref<string>('');
const passwordRef = ref<string>('');
</script>