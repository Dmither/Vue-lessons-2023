<script setup>
import { ref } from 'vue';

const counter = ref(0);

</script>

<template>
  <button class="counter-button" @click="counter++">{{counter}}</button>
</template>

<style>
.counter-button {
  width: 50px;
  background-color: brown;
  color: white;
  border: none;
}
</style>