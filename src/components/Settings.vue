<template>
    <div class="settings-button">
        <Icon
            @click="containerManipulation"
            icon="simple-line-icons:settings"
            width="30"
            height="30"
        />
    </div>
    <div class="settings-background"
         v-show="showSettings"
    >
        <div class="settings-container"
            :aria-disabled="loading">
            <div class="settings-header">
                <span>Settings</span>
                <Icon class="settings-close-button"
                    @click="containerManipulation"
                    icon="material-symbols:close"
                    width="24"
                    height="24"
                />
            </div>
            <div class="settings-content">
                <div class="settings-categories">
                    <button class="settings-categories-button"
                            :class="chosenCategory === 'general' && 'chosen'"
                            @click="chosenCategory = 'general'"
                    >
                        General
                    </button>
                    <button class="settings-categories-button"
                            :class="chosenCategory === 'information' && 'chosen'"
                            @click="chosenCategory = 'information'"
                    >
                        Information
                    </button>
                </div>
                <div class="settings-params">
                    <div v-if="chosenCategory === 'general'">
                            <div class="settings-params-button-container">
                                <span>
                                    Log out on this device
                                </span>
                                <button class="settings-params-button"
                                    @click="logOutContainer()"
                                >
                                    Log out
                                </button>
                            </div>
                            <div class="settings-params-button-container">
                                <span>
                                    Delete all chats
                                </span>
                                <button class="settings-params-button delete"
                                    @click="deleteChats()"
                                >
                                    Delete
                                </button>
                            </div>
                    </div>
                    <div v-else-if="chosenCategory === 'information'">
                        <span>1.1.0</span>
                        <ul>
                            <li>Settings</li>
                            <li>Delete chats</li>
                            <li>Log out</li>
                            <li>Fix errors</li>
                        </ul>
                        <span>1.0.0</span>
                        <ul>
                            <li>Text ai assistant</li>
                            <li>Image generator</li>
                            <li>Authorization</li>
                            <li>Chats history</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import "../css/settings.scss";
import gsap from "gsap"
import { ref } from "vue";
import { logOut } from "../services/authentication.ts";
import { useRouter } from "vue-router";
import useLoading from "../../use/useLoading.ts";
import useErrorStore from "../../use/useErrorStore.ts";
import {deleteUserChats} from "../services/chats.ts";

const router = useRouter();

const { setLoading } = useLoading();
const { addError } = useErrorStore()

const showSettings = ref<boolean>(true);
const loading = ref<boolean>(false);
const chosenCategory = ref<"general" | "information">("general");

const containerManipulation = () => {
    if (showSettings.value) {
        gsap.to('.settings-background', {
            opacity: 0,
            duration: .3,
            onComplete: () => {
                showSettings.value = false;
            }
        })
    }
    else {
        showSettings.value = true;
        gsap.set('.settings-background', { opacity: 0 });
        gsap.to('.settings-background', {
            opacity: 1,
            duration: .3,
        })
    }
}

const logOutContainer = async () => {
    setLoading(true)
    try {
        const data = await logOut(loading);
        if (data) await router.push('/c');
    } catch (error: any) {
        addError(error.message);
    } finally {
        setLoading(false);
    }
}

const deleteChats = async () => {
    setLoading(true)
    try {
        await deleteUserChats();
        addError('Successfully deleted', "success");
    } catch (error: any) {
        addError(error.message);
    } finally {
        setLoading(false);
    }
}
</script>