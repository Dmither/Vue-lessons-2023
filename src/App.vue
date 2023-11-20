<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

const count = ref(0);
watch(count, changed => {
  console.log(`New value is ${changed}`);
})

</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>


<style>
button {
  display: block;
  padding: 10px;
  margin: 10px;
}
</style>