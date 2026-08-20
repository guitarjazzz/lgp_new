<template>
  <section class="relative bg-cover bg-center px-6 py-20 sm:px-12"
    style="background-image: linear-gradient(rgba(232, 239, 240, .62), rgba(232, 239, 240, .62)), url('https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1800&q=85')">
    <div class="mx-auto flex max-w-6xl justify-center">
      <div class="w-full max-w-[460px] rounded-xl bg-white p-7 text-center shadow-xl">
        <h2 class="text-2xl font-extrabold leading-tight text-[#15578d]">Get Professional Estimates,<br />Fast</h2>
        <input value="Mikhail Chernysh" data-question="firstname"
          class="mt-5 h-12 w-full rounded border border-green-400 px-4 text-center font-bold" />
        <input value="99506" data-question="zipcode" readonly
          class="mt-2 h-12 w-full rounded border border-slate-300 px-4 text-center font-bold" /><button
          class="mt-2 h-12 w-full rounded bg-[#15578d] font-bold text-white">Request Estimate</button>
        <p class="mt-3 text-[9px] text-slate-600">Zip code allows us to connect you with the right Pros</p>
      </div>
    </div>
  </section>
</template>