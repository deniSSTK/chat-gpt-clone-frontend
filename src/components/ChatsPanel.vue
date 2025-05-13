<template>
    <Icon class="open-left-panel-button" icon="line-md:menu" width="30" height="30" @click="panelManipulation"/>
    <div v-if="showPanel" class="left-panel-container-background"></div>
    <div class="left-panel-container">
        <Icon class="left-panel-close-icon" icon="material-symbols:close" width="30" height="30" @click="panelManipulation"/>
        <div class="chats">
            <a href="/c" class="chat-panel-button new-chat">
                <Icon icon="ic:outline-create" width="24" height="24" /> New Chat
            </a>
            <strong class="strong-title">chat history</strong>
            <div class="chat-content" v-for="(chat, index) in chats" :key="index">
                <a class="chat-panel-button" :href="`/c/${chat.chatId}`">{{chat.chatName}}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount , ref, onMounted, onUnmounted } from 'vue';
import "../css/panel-chat.css";
import { Icon } from "@iconify/vue"
import chatsService from "../services/chats.ts";
import gsap from "gsap";

const { getChats } = chatsService();

interface iChat {
    chatName: string;
    chatId: string;
    lastMessageTime: number;
}

const chats = ref<iChat[]>([]);
const showPanel = ref<boolean>(false);

onBeforeMount(async () => {
    const cacheChatsList = localStorage.getItem("cache/chat-list");
    if (cacheChatsList) {
        chats.value = JSON.parse(cacheChatsList);
    }
    const data = await getChats();
    chats.value = data.sort((a: iChat, b: iChat) => b.lastMessageTime - a.lastMessageTime);
    localStorage.setItem("cache/chat-list", JSON.stringify(chats.value));
})

const panelManipulation = () => {
    if (showPanel.value) {
        gsap.to(".left-panel-container", {
            width: 0,
            opacity: 0,
            duration: .3,
        })
        gsap.to(".left-panel-container-background", {
            opacity: 0,
            duration: .3,
            onComplete: () => {
                showPanel.value = false
            }
        })
    }
    else {
        showPanel.value = true
        gsap.to(".left-panel-container-background", {
            opacity: .5,
            duration: .3,
        })
        gsap.to(".left-panel-container", {
            width: 260,
            opacity: 1,
            duration: .3,
        })
    }
}

const handleResize = () => {
    if (window.innerWidth > 750) {
        gsap.set(".left-panel-container", {
            width: 260,
            opacity: 1
        });
        gsap.set(".left-panel-container-background", {
            opacity: 0,
        });
        showPanel.value = true;
    } else {
        gsap.set(".left-panel-container", {
            width: 0,
            opacity: 0
        });
        gsap.set(".left-panel-container-background", {
            opacity: 0,
        });
        showPanel.value = false;
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>