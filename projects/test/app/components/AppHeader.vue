<template>
  <header class="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
    <NuxtLink to="/" class="flex items-center gap-2 text-sm font-black tracking-tight">
      <span class="grid h-6 w-6 place-items-center bg-slate-950 text-xs text-yellow-300">C</span>
      CONTRACTORS<span class="text-yellow-700">.COM</span>
    </NuxtLink>
    <nav class="flex items-center gap-5 text-xs font-bold sm:gap-8">
      <a class="hidden hover:text-slate-600 sm:block" href="#projects">Browse Projects</a>
      <NuxtLink class="bg-slate-950 px-4 py-2.5 text-white transition hover:bg-slate-800" to="/form/">
        Start my project
      </NuxtLink>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>