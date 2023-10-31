<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';

const message = ref("Hello, World")

console.log(message)
console.log(message.value)
message.value = "Changed"

console.log(message.value)

</script>

<template>
  <h1>Hello, Vue World!</h1>
</template>
