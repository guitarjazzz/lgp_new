<template>
  <div>category</div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => !route.path.includes('/form/')
});
</script>
