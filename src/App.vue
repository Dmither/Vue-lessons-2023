<script setup>
import { ref, reactive, computed, onMounted, watch, watchEffect } from 'vue';

import Home from './components/Home.vue';
import Posts from './components/Posts.vue';
import Archive from './components/Archive.vue';

const currentTab = ref("Home")

const tabs = {
  "Home": Home,
  "Posts": Posts,
  "Archive": Archive
}
</script>

<template class="template">
  <div>
    <button v-for="(tab, label) in tabs" :key="label" @click="currentTab = label">
      {{ label }}
    </button>
    <component :is="tabs[currentTab]"></component>
  </div>
</template>

