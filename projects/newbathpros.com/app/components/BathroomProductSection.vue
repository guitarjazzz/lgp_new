<template>
  <section
    class="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 text-center sm:px-12 md:grid-cols-2 md:text-left">
    <div :class="imageOnRight ? 'order-1 md:order-1' : 'order-2 md:order-2'">
      <h2 class="text-2xl font-extrabold text-[#15578d]">{{ title }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-slate-700">{{ description }}</p>
      <p class="mt-5 text-sm font-bold">Average Cost Range: {{ costRange }}</p>
      <p class="text-xs text-slate-600">Our pros will give you a custom estimate.</p>
      <NuxtLink to="/get-started"
        class="mt-4 inline-block rounded bg-[#08a2d5] px-5 py-3 text-sm font-bold text-white hover:bg-[#078ab8]">Find
        a pro</NuxtLink>
    </div>
    <img class="mx-auto h-64 w-full max-w-xl object-cover"
      :class="imageOnRight ? 'order-2 md:order-2' : 'order-1 md:order-1'"
      :src="image" :alt="imageAlt" />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  costRange: string;
  image: string;
  imageAlt: string;
  imageOnRight?: boolean;
}>();
</script>