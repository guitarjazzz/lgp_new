<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="flex flex-1">
      <main class="flex-1 bg-gray-100 p-5">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
</script>