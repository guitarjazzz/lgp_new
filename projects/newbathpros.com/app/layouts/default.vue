<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-900">
    <AppHeader />
    <div class="flex flex-1">
      <main class="flex-1">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
</script>