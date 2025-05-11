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
            const res = await fetch('http://localhost:3000/authentication/create-user', {
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

            if (data.status === 201) return true
            else {
                addError(data.error)
                return false;
            }
        } catch(e) {
            addError(e)
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function checkAuth() {
        const response = await fetch('http://localhost:3000/authentication/check-auth', {
            method: 'GET',
            credentials: 'include',
        })
        const data: iAuthCheck = await response.json()
        return data.isAuthenticated;
    }

    return {
        checkAuth,
        signUp
    }
}

export default authService;