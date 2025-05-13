import type {Ref} from "vue";
import useErrorStore from "../../use/useErrorStore.ts";

const { addError } = useErrorStore();

interface iAuthCheck {
    isAuthenticated: boolean;
}

const authService = () => {
    async function signUp (
        email: string,
        password: string,
        loading: Ref<boolean>
    ){
        loading.value = true;

        try {
            const res = await fetch(`${import.meta.env.VITE_NEST_API_URL}/authentication/create-user`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    email,
                })
            })

            const data = await res.json();

            if (data.status === 201) return true;
            else {
                addError(data.error)
                return false;
            }
        } catch(error) {
            addError(error as string)
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function logIn(
        email: string,
        password: string,
        loading: Ref<boolean>
    ) {
        loading.value = true;
        try {
            const response = await fetch(`${import.meta.env.VITE_NEST_API_URL}/authentication/log-in`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    email,
                })
            })

            const data = await response.json();

            if (data.status === 200) {return true;}
            else {
                addError(data.error)
                return false;
            }
        } catch(error) {
            addError(error as string)
        } finally {
            loading.value = false;
        }
    }

    async function checkAuth() {
        try {
            const response = await fetch(`${import.meta.env.VITE_NEST_API_URL}/authentication/check-auth`, {
                method: 'GET',
                credentials: 'include',
            })
            const data: iAuthCheck = await response.json()
            return data.isAuthenticated;
        } catch (error) {
            addError(error as string)
        }
    }

    async function maintenanceCheck() {
        try {
            const response = await fetch(`${import.meta.env.VITE_NEST_API_URL}/authentication/check-maintenance`, {
                method: 'GET',
            })
            const data = await response.json();
            return data.maintenance
        } catch (error) {
            addError(error as string)
        }
    }

    return {
        checkAuth,
        signUp,
        logIn,
        maintenanceCheck
    }
}

export default authService;