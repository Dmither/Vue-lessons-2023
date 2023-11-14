<script setup>
import { computed } from 'vue';
const props = defineProps({
  firstName: String,
  firstNameModifiers: { default: () => ({}) },
  lastName: String,
  lastNameModifiers: { default: () => ({}) },
})
const emit = defineEmits(['update:firstName', 'update:lastName']);

const inputFirstName = computed({
  get() {
    return props.firstName;
  },
  set(value) {
    emitValue("firstName", value);
  }
})
const inputLastName = computed({
  get() {
    return props.lastName;
  },
  set(value) {
    emitValue("lastName", value);
  }
})

function emitValue(prop, value) {
  let result = value;
  if (props[`${prop}Modifiers`].upperCase) {
    result = value.toUpperCase()
  }
  if (props[`${prop}Modifiers`].capitalize) {
    result = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit(`update:${prop}`, result);
}

const prop1 = "capitalize";
console.log(props.firstNameModifiers[prop1])

console.log(props.firstNameModifiers)
console.log(props.lastNameModifiers)

</script>

<template>
  <input name="firstName" v-model="inputFirstName" />
  <br><br>
  <input name="lastName" v-model="inputLastName" />
</template>

<style scoped></style>