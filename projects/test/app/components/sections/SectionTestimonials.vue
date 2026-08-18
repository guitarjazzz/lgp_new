<script setup lang="ts">
defineProps<{
  title: string;
  testimonials: Array<{
    id: number;
    name: string;
    image: string;
    text: string;
    rating: number;
  }>;
}>();

const currentIndex = ref(0);

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length;
};

const prevTestimonial = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
};

const getRatingStars = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>

<template>
  <section class="bg-gradient-to-r from-yellow-400 to-yellow-300 py-24 px-10 mb-24">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-4xl font-bold text-black text-center mb-16">{{ title }}</h2>
      
      <div class="relative flex items-center gap-5 mb-8">
        <button class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/30 hover:bg-black/60 rounded-full text-white text-2xl flex items-center justify-center transition-all" @click="prevTestimonial">❮</button>
        
        <div class="flex-1 bg-white p-10 rounded-lg shadow-lg">
          <div class="flex items-center gap-4 mb-5">
            <img :src="testimonials[currentIndex].image" :alt="testimonials[currentIndex].name" class="w-16 h-16 rounded-full object-cover" />
            <div>
              <h3 class="text-lg font-semibold text-black">{{ testimonials[currentIndex].name }}</h3>
              <div class="text-yellow-500 text-lg">{{ getRatingStars(testimonials[currentIndex].rating) }}</div>
            </div>
          </div>
          <p class="text-base leading-relaxed text-gray-700 italic">"{{ testimonials[currentIndex].text }}"</p>
        </div>
        
        <button class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/30 hover:bg-black/60 rounded-full text-white text-2xl flex items-center justify-center transition-all" @click="nextTestimonial">❯</button>
      </div>

      <div class="flex justify-center gap-2">
        <div
          v-for="(_, index) in testimonials"
          :key="index"
          class="w-3 h-3 rounded-full bg-black/30 cursor-pointer transition-all hover:bg-black/50"
          :class="{ 'bg-black w-8 rounded': index === currentIndex }"
          @click="currentIndex = index"
        ></div>
      </div>
    </div>
  </section>
</template>
