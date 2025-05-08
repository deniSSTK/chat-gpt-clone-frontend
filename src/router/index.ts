import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from "../views/ChatPage.vue";

const routes = [
    { path: '/c', name: "chat", component: ChatPage },
    { path: '/c/:id', name: "chat-id", component: ChatPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
