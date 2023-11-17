<script setup>
import { ref, reactive, onMounted } from 'vue';

const mainClass = ref("active")

</script>

<template>
  <div :class="mainClass"></div>
</template>


<style>
.wrapper {
  padding: 15px;
}
</style>