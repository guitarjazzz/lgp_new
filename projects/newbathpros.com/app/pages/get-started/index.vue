<template>
  <div>Get started <span class="text-lg text-purple-600 font-bold">{{ zipcode }}</span></div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const zipcode = route.query.zipcode as string || '';
</script>
