<script setup>
import { ref, computed } from 'vue';
import MyComponent from './components/MyComponent.vue';

</script>

<template>
  <MyComponent class="large" @click="() => console.log('Hello App')"/>
</template>

