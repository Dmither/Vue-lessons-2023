<template>
  <div class="login-background" @click="cancel">
    <form class="login-wrapper" @submit.prevent="submit">
      <h4 class="login-title">Login to your account</h4>
      <div class="login-field">
        <label for="emain">Email</label>
        <input type="email" name="email" id="email">
      </div>
      <div class="login-field login-pass">
        <label for="password">Password</label>
        <input :type="showpass ? 'text' : 'password'" name="password" id="password">
        <input type="checkbox" class="login-showpass" v-model="showpass">
      </div>
      <button class="login-btn" type="submit">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(["closeLogin"]);

const showpass = ref(false);

function cancel(event) {
  if (event.target.classList.contains("login-background")) {
    emit("closeLogin");
  }
}

function submit() {
  emit("closeLogin");
}

</script>

<style scoped>
.login-background {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #00000077;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-wrapper {
  padding: 15px;
  background-color: #333;
  max-width: 400px;
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-title {}

.login-field {
  display: flex;
  flex-direction: column;
}

.login-pass {
  position: relative;
}

.login-showpass {
  position: absolute;
  bottom: 3px;
  right: 3px;
}

.login-btn {}
</style>