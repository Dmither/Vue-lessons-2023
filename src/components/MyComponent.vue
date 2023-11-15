<script setup>
import { useAttrs } from 'vue';


</script>

<template>
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>


<style scoped></style>