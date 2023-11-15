<script setup>
import { ref, computed } from 'vue';
import MyComponent from './components/MyComponent.vue';

</script>

<template>
  <MyComponent>
    <template v-slot:header>
      Header
    </template>
    Body
    <template #footer>
      Footer
    </template>
  </MyComponent>
</template>

