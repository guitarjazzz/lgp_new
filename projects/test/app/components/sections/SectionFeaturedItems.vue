<script setup lang="ts">
defineProps<{
  title: string;
  items: Array<{
    id: number;
    title: string;
    image: string;
    description: string;
  }>;
}>();
</script>

<template>
  <section class="bg-white py-24 px-10 mb-24">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold text-black text-center mb-16">{{ title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in items" :key="item.id" class="bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
          <div class="h-48 overflow-hidden bg-gray-300">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          </div>
          <div class="p-5 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="text-lg font-semibold text-black mb-2">{{ item.title }}</h3>
              <p class="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{{ item.description }}</p>
            </div>
            <a href="#" class="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors">Learn More →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
