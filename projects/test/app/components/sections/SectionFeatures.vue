<script setup lang="ts">
defineProps<{
  title: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}>();
</script>

<template>
  <section class="bg-white py-24 px-10 mb-24">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold text-black text-center mb-20">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="(feature, index) in features" :key="index" class="text-center p-5 transition-all duration-300 hover:-translate-y-2">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full text-3xl font-bold text-black mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-black mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
