import { reactive } from 'vue';

const state = reactive({
    errors: [] as string[]
});

const addError = (message: string) => {
    const id = Date.now();
    state.errors.push({ id, message });

    setTimeout(() => {
        const index = state.errors.findIndex((error) => error.id === id);
        if (index !== -1) state.errors.splice(index, 1);
    }, 4000);
};

export default function useErrorStore() {
    return {
        errors: state.errors,
        addError
    };
}
