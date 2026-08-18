<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  buttonText: string;
}>();
</script>

<template>
  <section class="bg-gradient-to-r from-black to-gray-800 py-32 px-10 text-center">
    <div class="max-w-5xl mx-auto flex flex-col items-center gap-5">
      <h2 class="text-5xl font-bold text-white leading-tight">{{ title }}</h2>
      <p class="text-lg text-gray-400 max-w-md">{{ description }}</p>
      <button class="mt-5 px-10 py-4 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        {{ buttonText }}
      </button>
    </div>
  </section>
</template>
