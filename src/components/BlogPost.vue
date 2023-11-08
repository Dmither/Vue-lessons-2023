<script setup>
const props = defineProps(["title"])
const emits = defineEmits(["increase-text", "decrease-text"])
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('increase-text')">Increase font size</button>
    <button @click="$emit('decrease-text')">Decrease font size</button>
  </div>
</template>