<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const text1 = ref("");
const text2 = ref("");

onMounted(() => {
  console.log(`Now the component has mounted`)
})

</script>

<template>
  <p>Input1: {{ text1 }}</p>
  <input type="text" v-model="text1">
  <p>Input2: {{ text2 }}</p>
  <input type="text" v-model.lazy="text2">
</template>
