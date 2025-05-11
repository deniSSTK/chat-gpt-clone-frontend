import type {iMessage} from "../views/ChatPage.vue";
import type {Ref} from "vue";

interface iGenerateFunction {
    messages: Ref<iMessage[]>,
    inputValue: Ref<string>,
    isGenerating: Ref<boolean>
}

const generateService = () => {
    function generateImage({
                               messages,
                               inputValue,
                               isGenerating}
                           : iGenerateFunction) {
        if (inputValue.value === "" || isGenerating.value) return;
        isGenerating.value = true;
        const prompt = inputValue.value;
        messages.value = [
            ...messages.value,
            {role: "user", content: inputValue.value},
            {role: "assistant", content: '', loadingImage: true},
        ];
        inputValue.value = "";

        setTimeout(() => {
            fetch("https://model-fast-api-w4du.onrender.com/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                },
                body: JSON.stringify({ prompt })
            }).then(res => res.json().then(data => {
                const img = new Image();
                img.src = data.url;

                img.onload = () => {
                    messages.value[messages.value.length - 1] =  {role: "assistant", content: "", imageUrl: data.url};
                };
            })).finally(() => {
                isGenerating.value = false;
            })
        }, 200)
    }

    function generateText({
                              inputValue,
                              isGenerating,
                              messages
                          }: iGenerateFunction) {
        if (inputValue.value === "") return;
        messages.value = [
            ...messages.value,
            {role: "user", content: inputValue.value}
        ];
        inputValue.value = "";
        isGenerating.value = true;

        fetch('https://model-fast-api-w4du.onrender.com/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json',
            },
            body: JSON.stringify({
                messages: messages.value
            })
        })
            .then(res => res.json())
            .then(data => {
                messages.value.push({role: "assistant", content: data});
            })
            .finally(() => isGenerating.value = false)
    }

    return {
        generateImage,
        generateText,
    }
}

export default generateService;