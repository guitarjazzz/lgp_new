<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <section class="bg-gradient-to-r from-gray-100 to-white py-24 px-10 mb-24">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl md:text-5xl font-bold text-black leading-tight">{{ title }}</h1>
        <p class="text-lg text-gray-600 leading-relaxed">{{ description }}</p>
        <button class="w-fit px-8 py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition-all duration-300 hover:-translate-y-0.5">
          Get Started
        </button>
      </div>
      <div class="overflow-hidden rounded-lg shadow-lg">
        <img :src="image" :alt="title" class="w-full h-auto block" />
      </div>
    </div>
  </section>
</template>
