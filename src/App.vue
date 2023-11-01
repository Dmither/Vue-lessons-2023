<script setup>
import { ref } from 'vue';

const obj = ref({
  nasted: {count: 0},
  arr: ["foo", "bar"],
});

function mutateDeeply() {
  obj.value.nasted.count++
}

</script>

<template>
  <button @click="mutateDeeply">{{ obj.nasted.count }}</button>
</template>
