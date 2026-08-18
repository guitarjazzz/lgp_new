<template>
  <footer class="bg-[#15578d] px-6 py-10 text-white sm:px-12">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col justify-between gap-8 border-b border-white/20 pb-8 sm:flex-row sm:items-end">
        <NuxtLink to="/" class="flex w-fit items-center gap-2 text-white no-underline">
          <span class="flex flex-col gap-[3px]" aria-hidden="true"><span class="block h-[3px] w-9 rounded-[50%] bg-white" /><span class="block h-[3px] w-9 rounded-[50%] bg-white" /><span class="block h-[3px] w-9 rounded-[50%] bg-white" /></span>
          <span class="leading-none"><small class="block text-[9px]">new</small><strong class="block text-xl font-black">BATH PROS</strong></span>
        </NuxtLink>
        <p class="text-xs text-white/70">© {{ new Date().getFullYear() }} offers.newbathpros.com. All Rights Reserved.</p>
      </div>
      <div class="grid gap-8 pt-7 text-xs text-white/80 sm:grid-cols-2">
        <nav class="flex flex-col gap-3"><NuxtLink to="/" class="hover:text-white">Home</NuxtLink><a href="#privacy" class="hover:text-white">Privacy Policy</a><a href="#cookies" class="hover:text-white">Cookie Policy</a><a href="#accessibility" class="hover:text-white">Accessibility Policy</a><a href="#limit" class="hover:text-white">Limit the Use of Sensitive Personal Information</a></nav>
        <nav class="flex flex-col gap-3 sm:items-end"><a href="#about" class="hover:text-white">About Us</a><a href="#terms" class="hover:text-white">Terms Of Use</a><a href="#vulnerability" class="hover:text-white">Vulnerability Policy</a><a href="#sharing" class="hover:text-white">Do Not Sell or Share My Personal Information</a></nav>
      </div>
    </div>
  </footer>
</template>
