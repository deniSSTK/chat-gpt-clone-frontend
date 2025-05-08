<template>
    <div class="left-panel-container">
        <div class="chats">
            <button class="chat-panel-button new-chat">
                <Icon icon="ic:outline-create" width="24" height="24" /> New Chat
            </button>
            <strong class="strong-title">chat history</strong>
            <div class="chat-content" v-for="(chat, index) in chats" :key="index">
                <a class="chat-panel-button" :href="`/c/${chat.id}`">{{chat.name}}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import "../css/panel-chat.css";
import { Icon } from "@iconify/vue"

interface iChats {
    name: string;
    id: string;
}

const chats = ref<iChats[]>([
    { name: 'chat1', id: '1' },
    { name: 'randomchat', id: '2' },
    { name: 'newconversation', id: '3' },
    { name: 'testchat', id: '4' },
    { name: 'sampledialog', id: '5' },
    { name: 'exampletalk', id: '6' },
    { name: 'democonversation', id: '7' },
    { name: 'trialchat', id: '8' },
    { name: 'practice dialogue', id: '9' },
    { name: 'learningchat', id: '10' },
    { name: 'developmenttalk', id: '11' },
    { name: 'debuggingconversation', id: '12' },
    { name: 'finalchat', id: '13' },
    { name: 'finalchatjefeamflkamfaem', id: '14' },
    { name: 'finalchatadwdawd', id: '15' },
]);

</script>