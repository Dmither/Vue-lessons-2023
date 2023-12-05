<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useFetch } from './components/fetch.js'

const users = "https://jsonplaceholder.typicode.com/users"
const photos = "https://jsonplaceholder.typicode.com/photos"
const todos = "https://jsonplaceholder.typicode.com/todos"
const ideas = "https://jsonplaceholder.typicode.comasd/ideas"
const url = ref(users);

const {data, error} = useFetch(url);

onMounted(() => console.log("first"))
onMounted(() => console.log("second"))

</script>

<template>
  <button @click="url = users">Users</button>
  <button @click="url = photos">Photos</button>
  <button @click="url = todos">Todos</button>
  <button @click="url = ideas">Ideas</button>
  <div v-if="error">{{ error.message }}</div>
  <div v-else-if="data">
    Data is loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>


<style></style>