<template>
  <section class="relative min-h-[720px] bg-cover bg-center md:min-h-[480px]"
    style="background-image: linear-gradient(90deg, rgba(8, 18, 24, .78) 0%, rgba(8, 18, 24, .32) 55%, rgba(8, 18, 24, .18) 100%), url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85')">
    <div
      class="mx-auto flex min-h-[720px] max-w-6xl flex-col items-center justify-center px-6 py-12 md:min-h-[480px] md:flex-row md:items-center md:justify-start md:px-12 md:py-14">
      <h1
        class="relative z-10 max-w-[390px] text-center text-4xl font-black leading-[1.02] tracking-tight text-white md:text-left md:text-5xl">
        Get Your Bathroom and Shower Remodel Estimate Today</h1>
      <div
        class="relative z-10 mt-8 w-[calc(100%-8px)] max-w-[440px] rounded-2xl bg-white p-6 text-center shadow-2xl md:absolute md:left-auto md:right-12 md:top-1/2 md:mt-0 md:-translate-y-1/2">
        <div class="mb-4 grid grid-cols-3 gap-2 text-[9px] font-semibold text-slate-700"><span>♨ Easy 1 Day<br />Bath
            Remodels</span><span>▥ Increase Your<br />Home Value</span><span>⌂ Financing May<br />Be Available</span>
        </div>
        <h2 class="text-2xl font-extrabold text-[#15578d]">Are we in your area?</h2>
        <p class="mt-1 text-xs text-slate-600">Enter your ZIP code to check availability</p>
        <form class="mt-4" @submit.prevent="goToEstimate">
          <input v-model="zipcode" data-question="zipcode" type="text" placeholder="ZIP Code"
            class="h-12 w-full rounded border border-slate-300 px-4 text-center text-sm font-bold placeholder:text-slate-400 focus:border-[#15578d] focus:outline-none focus:ring-1 focus:ring-[#15578d]" />
          <button class="mt-3 h-12 w-full rounded-full bg-[#08a2d5] font-bold text-white transition hover:bg-[#078ab8]">
            Continue
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const zipcode = ref('');

function goToEstimate() {
  if (zipcode.value) navigateTo(`/get-started/?zipcode=${zipcode.value}`);
}
</script>