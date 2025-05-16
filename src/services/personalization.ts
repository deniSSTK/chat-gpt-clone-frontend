import useErrorStore from "../use/useErrorStore.ts";

const { addError } = useErrorStore()

const getPersonalizationStyle = async () => {
    try {
        const response = await fetch("http://localhost:3000/personalization/get-personalization-style", {
            method: "GET",
            credentials: "include",
        })

        if (response.ok) {
            return await response.text();
        }

        return "default";
    } catch (error: any) {
        addError(error.message);
        return "default";
    }
}

const updatePersonalizationStyle = async (style: string) => {
    try {
        const response = await fetch("http://localhost:3000/personalization/update-personalization-style", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json',
            },
            body: JSON.stringify({ style }),
        })

        if (response.ok) {
            return await response.text();
        }

        return false;
    } catch (error: any) {
        addError(error.message)
    }
}

export {
    getPersonalizationStyle,
    updatePersonalizationStyle
}