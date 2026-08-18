<template>
  <div class="flex min-h-screen flex-col bg-white">
    <div class="bg-yellow-300 pt-5">
      <AppHeader />
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
</script>