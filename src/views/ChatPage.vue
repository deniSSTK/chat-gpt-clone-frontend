<template class="app">
    <div class="content">
        <ChatsPanel />
        <div class="chat">
            <div class="container container-messages" ref="messagesContainerRef">
                <Messages :visibleMessages="visibleMessages"/>
                <div class="generating-loading" v-if="isGenerating && !messages[messages.length - 1].loadingImage" />
            </div>
            <div class="container container-input">
                <input v-model="inputValue" placeholder="write" @keydown.enter="generateChoose()" class="input-text"/>
                <div class=footer-input-buttons-container>
                    <div class="container-mode-inputs">
                        <div class="container-mode-input">
                            <input type="radio" class="input-checkbox" id="create-image" value="image" @click="toggleModeChoose('image')" v-model="selectedMode" />
                            <label for="create-image" class="input-checkbox-label">
                                <Icon icon="mynaui:image" width="25" height="25"/>
                                <span>Create Image</span>
                            </label>
                        </div>
<!--                        <div class="container-mode-input">-->
<!--                            <input type="radio" class="input-checkbox" id="reason" value="reason" @click="toggleModeChoose('reason')" v-model="selectedMode" />-->
<!--                            <label for="reason" class="input-checkbox-label">-->
<!--                                <Icon icon="mdi:think-outline" width="25" height="25"/>-->
<!--                                <span>Reason</span>-->
<!--                            </label>-->
<!--                        </div>-->
                    </div>
                    <button :disabled="isGenerating" @click="generateChoose()">
                        <Icon icon="line-md:arrow-up" width="60" height="60"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import generateService from "../services/generate.ts";

export interface iMessage {
    content: string;
    role: "system" | "user" | "assistant";
    imageUrl?: string;
    loadingImage?: boolean;
}

import { computed, nextTick, ref, watch } from "vue";
import { Icon } from '@iconify/vue';
import ChatsPanel from "../components/ChatsPanel.vue";
import Messages from "../components/Messages.vue";
import '../css/page-chat.css';

const inputValue = ref<string>("");
const messages = ref<iMessage[]>([
    {
        "role": "system",
        "content": "You are an assistant bot, designed to have regular conversations. Respond to questions and engage in casual dialogue. If the user explicitly mentions that they want to create an image, direct them to click the button below. Do not respond about images or pictures in text format, including links or URLs. You do not need to send any image-related text responses since image generation is handled separately."
    }
]);
// const isLoading = ref<boolean>(false);
const isGenerating = ref<boolean>(false);
const selectedMode = ref<'image' | 'reason' | null>(null);

const messagesContainerRef = ref<HTMLDivElement | null>(null);

const visibleMessages = computed(() =>
    messages.value.filter(msg => msg.role !== 'system')
);

const { generateImage, generateText } = generateService();

watch(messages, async () => {
    await nextTick();
    if (messagesContainerRef.value) {
        messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight;
    }
});

const generateChoose = () => {
    if(isGenerating.value) return;
    switch (selectedMode.value) {
        case 'image':
            selectedMode.value = null;
            generateImage({
                messages,
                inputValue,
                isGenerating,
            });
            break;
        default:
            generateText({
                messages,
                inputValue,
                isGenerating,
            })
            break;
    }
}

const toggleModeChoose = (mode: 'reason' | 'image' | null) => {
    if (mode === selectedMode.value) {
        selectedMode.value = null;
    }
    else {
        selectedMode.value = mode;
    }
}
</script>