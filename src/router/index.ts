import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from "../views/ChatPage.vue";
import LogInPage from "../views/LogInPage.vue";
import Maintenance from "../views/Maintenance.vue";
import SignUpPage from "../views/SignUpPage.vue";
import authService from "../services/authentication.ts";
import NotFoundPage from "../views/NotFoundPage.vue";
import useErrorStore from "../../use/useErrorStore.ts";

const { checkAuth, maintenanceCheck } = authService();
const { addError } = useErrorStore();

const routes = [
    { path: '/', redirect: () => `/c` },
    { path: '/c', redirect: () => `/c/${crypto.randomUUID()}-${Date.now()}` },
    { path: '/c/:id', name: "chat-id", component: ChatPage },
    { path: '/log-in', name: 'log-in', component: LogInPage },
    { path: '/sign-up', name: 'sign-up', component: SignUpPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
    { path: '/maintenance', name: 'maintenance', component: Maintenance }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, _, next) => {
    try {
        const isMaintenance = await maintenanceCheck();
        console.log(isMaintenance);
        if (isMaintenance && to.name !== 'maintenance') {
            return next('/maintenance');
        }
        if (isMaintenance && to.name === 'maintenance') {
            return next();
        }

        const isAuth = await checkAuth();
        if ((to.name === 'log-in' || to.name === 'sign-up') && isAuth) {
            return next('/c');
        }
        if (!isAuth && to.name !== 'log-in' && to.name !== 'sign-up' && to.name !== 'not-found') {
            return next('/log-in');
        }

        return next();
    } catch (e) {
        addError(e as string)
        return next('/log-in');
    }
});

export default router;