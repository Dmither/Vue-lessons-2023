<template>
  <div class="wrapper">
    <Login v-if="show" @closeLogin="() => show = false" />
    <button @click="() => show = true">Log in</button>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';

const Login = defineAsyncComponent(() => import("./components/Login.vue"));

const show = ref(false);
</script>

<style>
.wrapper {
  padding: 15px;
}
</style>