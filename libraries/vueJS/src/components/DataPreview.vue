<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
});
</script>

<template>
    <section id="primaryDataContainer">
        <h2 name="title">{{ title }}</h2>
        <p name="summary">{{ summary }}</p>
        <hr>
        <pre name="data">{{ data }}</pre>
    </section>
</template>

<style>
section {
    color: black;
    padding: 0 1rem;
}

section h2 {
    text-align: center;
    margin-bottom: 2px;
}

section p {
    min-height: 3rem;
    padding: 0 2rem;
    font-size: 14px;
    text-align: justify;
}

section hr {
    margin: 0 15%;
    height: 4px;
    color: rgb(23, 80, 150);
    background-color: rgb(23, 80, 150);
    border-color: rgb(23, 80, 150);
    border-radius: 3px;
    border-width: 1px;
}

section pre {
    min-width: 100%;
    text-wrap: balance;
    inline-size: min-content;
}
</style>
