<script setup>
import { ref, computed } from 'vue';
import CustomInput from './components/CustomInput.vue';
const firstName = ref("");
const lastName = ref("");

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>

<template class="template">
  <div>
    <CustomInput v-model:firstName.capitalize="firstName" v-model:lastName.upperCase="lastName"/>
    <p>{{ fullName }}</p>
  </div>
</template>

