<script setup lang="ts">
defineProps<{
  title: string;
  images: string[];
}>();

const selectedImage = ref(0);

const nextImage = () => {
  selectedImage.value = (selectedImage.value + 1) % images.length;
};

const prevImage = () => {
  selectedImage.value = (selectedImage.value - 1 + images.length) % images.length;
};
</script>

<template>
  <section class="bg-gray-50 py-24 px-10 mb-24">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold text-black text-center mb-16">{{ title }}</h2>
      
      <div class="relative flex items-center gap-5 mb-8">
        <button class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full text-white text-2xl flex items-center justify-center transition-all" @click="prevImage">❮</button>
        <div class="w-full rounded-lg overflow-hidden shadow-lg">
          <img :src="images[selectedImage]" :alt="title" class="w-full h-96 object-cover block" />
        </div>
        <button class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full text-white text-2xl flex items-center justify-center transition-all" @click="nextImage">❯</button>
      </div>

      <div class="grid grid-cols-4 md:grid-cols-6 gap-3">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="h-20 rounded cursor-pointer border-2 border-transparent overflow-hidden transition-all hover:border-yellow-400"
          :class="{ 'border-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.5)]': index === selectedImage }"
          @click="selectedImage = index"
        >
          <img :src="image" :alt="title" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>
