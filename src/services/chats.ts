import useErrorStore from "../../use/useErrorStore.ts";
import type {iMessage} from "../views/ChatPage.vue";
import type { Ref } from 'vue';

const { addError } = useErrorStore()

const chatsService = () => {
    async function saveMessage(
        messages: iMessage[],
        chatId: string,
        messagesRef?: Ref<iMessage[]>,
        isGenerating?: Ref<boolean>,
    ) {
        try {
            if (messagesRef) {
                const userMessage = messagesRef.value[messagesRef.value.length - 2];
                if (userMessage.generatingText) {
                    messagesRef.value[messagesRef.value.length - 2] = {...userMessage, generatingText: false};
                    messagesRef.value[messagesRef.value.length - 1] = {...messagesRef.value[messagesRef.value.length - 1], generatingText: true};
                }
            }
            await fetch('http://localhost:3000/chats/save-message', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    messages,
                    chatId,
                })
            }).then(res => res.json()).then((data) => {
                if (data) {
                    if (isGenerating) {
                        isGenerating.value = false;
                    } else if (messagesRef) {
                        const userMessage = messagesRef.value[messagesRef.value.length - 1];
                        if (userMessage.generatingText) {
                            messagesRef.value[messagesRef.value.length - 1] = {...userMessage, generatingText: false};
                        }
                    }
                }
            })
        } catch (error) {
            addError(error as string);
        }
    }

    async function chatCheck(
        chatId: string,
    ) {
        try {
            const response = await fetch('http://localhost:3000/chats/chat-check', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    chatId,
                })
            })

            return await response.json();
        } catch(error) {
            addError(error as string);
            return false;
        }
    }

    async function getChats() {
        try {
            const response = await fetch('http://localhost:3000/chats/get-chats', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                }
            })
            return await response.json();
        } catch (error) {
            addError(error as string);
        }
    }

    async function getAllMessages(
        chatId: string,
        loading: Ref<boolean>,
    ) {
        loading.value = true;
        try {
            const response = await fetch('http://localhost:3000/chats/get-messages', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    chatId,
                })
            })

            return await response.json();
        } catch (error) {
            console.error(error)
            addError(error as string);
        } finally {
            loading.value = false;
        }
    }

    return {
        saveMessage,
        chatCheck,
        getChats,
        getAllMessages
    }
}

export default chatsService;