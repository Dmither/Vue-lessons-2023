<script setup>
import { ref, computed, provide } from 'vue';
import MyComponent from './components/MyComponent.vue';

const val = ref(0);
provide('key', val);
console.log(val)

</script>

<template>
  <MyComponent></MyComponent>
</template>

