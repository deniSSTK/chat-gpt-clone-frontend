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
                maxlength="16"
            >
            <button
                class="button-auth"
                :disabled="
                !validator.isEmail(emailRef)
                || passwordRef.length < 8
                || loading"
                @click="logInRouter()"
            >
                {{ loading ? 'Loading...' : 'Log in'}}
            </button>
            <a href="/sign-up">Don't have an account yet?</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../css/auth.css';
import {ref} from 'vue'
import validator from 'validator'
import { useRouter } from "vue-router";
import authentication from "../services/authentication.ts";

const { logIn } = authentication();

const router = useRouter();

const emailRef = ref<string>('');
const passwordRef = ref<string>('');
const loading = ref<boolean>(false);

const logInRouter = async () => {
    const data = await logIn(
        emailRef.value,
        passwordRef.value,
        loading
    )
    if (data) await router.push('/c')
    emailRef.value = ''
    passwordRef.value = ''
}
</script>