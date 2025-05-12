<template>
    <div class="left-panel-container">
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
import { onBeforeMount , ref } from 'vue';
import "../css/panel-chat.css";
import { Icon } from "@iconify/vue"
import chatsService from "../services/chats.ts";

const { getChats } = chatsService();

interface iChat {
    chatName: string;
    chatId: string;
    lastMessageTime: number;
}

const chats = ref<iChat[]>([]);

onBeforeMount(async () => {
    const cacheChatsList = localStorage.getItem("cache/chat-list");
    if (cacheChatsList) {
        chats.value = JSON.parse(cacheChatsList);
    }
    const data = await getChats();
    chats.value = data.sort((a: iChat, b: iChat) => b.lastMessageTime - a.lastMessageTime);
    localStorage.setItem("cache/chat-list", JSON.stringify(chats.value));
})
</script>