<template>
    <div class="pre-container">
        <div class="pre-title">
            {{language ? language : "html"}}
            <Icon
                icon="iconamoon:copy-light"
                width="24"
                height="24"
                class="icon-copy"
                @click="copyToClipboard"/>
        </div>
        <pre v-html="highlightedCode" class="hljs" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
import { Icon } from "@iconify/vue";

interface Props {
    code: string;
    language: string | undefined;
}

const props = defineProps<Props>();

const highlightedCode = ref<string>('');

const highlightCode = () => {
    const validLanguage = props.language && hljs.getLanguage(props.language) ? props.language : 'plaintext';
    highlightedCode.value = hljs.highlight(props.code, { language: validLanguage }).value;
};

const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.code);
}

onMounted(highlightCode);
watch(() => props.code, highlightCode);
</script>

<style scoped>
.pre-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
}
.pre-title {
    width: 100%;
    padding: 15px;
    background-color: var(--grey);
    color: var(--white);
    border-radius: var(--border-md) var(--border-md) 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
pre {
    margin: 0;
    width: 100%;
    padding: 15px;
    background-color: var(--background-dark);
    border-radius: 0 0 var(--border-md) var(--border-md);
    overflow-x: auto;
}
.icon-copy {
    cursor: pointer;
    transition: color .2s;
}
.icon-copy:active {
    color: var(--green);
}
</style>
