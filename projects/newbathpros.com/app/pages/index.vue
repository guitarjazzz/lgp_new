<template>
  <div class="overflow-hidden bg-white">
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

    <section class="bg-[#f0f5f7] px-6 py-14 sm:px-12 sm:py-20">
      <div class="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
        <article v-for="service in services" :key="service.title" class="text-center">
          <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            :class="service.color">{{ service.icon }}</div>
          <h3 class="mx-auto max-w-[220px] text-lg font-extrabold leading-tight text-[#15578d]">{{ service.title }}</h3>
          <p class="mt-3 text-xs font-semibold text-slate-700">{{ service.tagline }}</p>
          <p class="mt-4 text-sm leading-relaxed text-slate-700">{{ service.description }}</p>
          <NuxtLink to="/get-started"
            class="mt-5 inline-block rounded-full border border-[#15578d] px-4 py-2 text-xs font-bold text-[#15578d] hover:bg-[#15578d] hover:text-white">
            Get Started Today</NuxtLink>
        </article>
      </div>
    </section>

    <section
      class="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 text-center sm:px-12 md:grid-cols-2 md:text-left"><img
        class="mx-auto h-64 w-full max-w-xl object-cover"
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
        alt="Modern bathroom with glass shower" />
      <div>
        <h2 class="text-2xl font-extrabold text-[#15578d]">Shower Install</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-700">Revamp your bathroom experience with a sleek new shower
          in two days or less. A modern, high-quality shower fixture can be fitted by our qualified specialists in just
          the space of one day.</p>
        <p class="mt-5 text-sm font-bold">Average Cost Range: $10,000 - $15,000</p>
        <p class="text-xs text-slate-600">Our pros will give you a custom estimate.</p>
        <NuxtLink to="/get-started"
          class="mt-4 inline-block rounded bg-[#08a2d5] px-5 py-3 text-sm font-bold text-white hover:bg-[#078ab8]">Find
          a pro</NuxtLink>
      </div>
    </section>

    <section class="bg-[#ffb58e] px-6 py-14 sm:px-12">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-extrabold">Benefits of Bathroom Improvements</h2>
        <div class="mt-8 grid gap-8 sm:grid-cols-2">
          <article v-for="benefit in benefits" :key="benefit.title">
            <h3 class="font-extrabold">✓ {{ benefit.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-800">{{ benefit.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section
      class="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 text-center sm:px-12 md:grid-cols-2 md:text-left">
      <div class="md:order-1">
        <h2 class="text-2xl font-extrabold text-[#15578d]">Walk-In Tubs</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-700">Walk-in tubs are a great way to make your bathing
          experience safer, easier, and more soothing. They are the perfect solution for those who have mobility issues
          but want to stay independent.</p>
        <p class="mt-5 text-sm font-bold">Average Cost Range: $15,000 - $20,000</p>
        <p class="text-xs text-slate-600">Our pros will give you a custom estimate.</p>
        <NuxtLink to="/get-started"
          class="mt-4 inline-block rounded bg-[#08a2d5] px-5 py-3 text-sm font-bold text-white hover:bg-[#078ab8]">Find
          a pro</NuxtLink>
      </div><img class="mx-auto h-64 w-full max-w-xl object-cover md:order-2"
        src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85"
        alt="Accessible walk-in bathtub" />
    </section>

    <section class="relative bg-cover bg-center px-6 py-20 sm:px-12"
      style="background-image: linear-gradient(rgba(232, 239, 240, .62), rgba(232, 239, 240, .62)), url('https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1800&q=85')">
      <div class="mx-auto flex max-w-6xl justify-center">
        <div class="w-full max-w-[460px] rounded-xl bg-white p-7 text-center shadow-xl">
          <h2 class="text-2xl font-extrabold leading-tight text-[#15578d]">Get Professional Estimates,<br />Fast</h2>
          <input value="Mikhail Chernysh"
            data-question="firstname"
            class="mt-5 h-12 w-full rounded border border-green-400 px-4 text-center font-bold" />
          <input value="99506"
            data-question="zipcode"
            readonly class="mt-2 h-12 w-full rounded border border-slate-300 px-4 text-center font-bold" /><button
            class="mt-2 h-12 w-full rounded bg-[#15578d] font-bold text-white">Request Estimate</button>
          <p class="mt-3 text-[9px] text-slate-600">Zip code allows us to connect you with the right Pros</p>
        </div>
      </div>
    </section>

    <section class="px-6 py-14 text-center sm:px-12">
      <h2 class="text-2xl font-extrabold text-[#15578d]">Comparing Bathroom Quotes</h2>
      <p class="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">Does a bathroom need a total makeover? Or
        do you just need to make a few improvements? Whatever your bathroom remodel needs are, our network of qualified
        pros provide close contact and support so that your project goes smoothly and efficiently.</p>
      <NuxtLink to="/get-started"
        class="mt-5 inline-block rounded bg-[#08a2d5] px-6 py-3 text-sm font-bold text-white hover:bg-[#078ab8]">Get
        Started</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const zipcode = ref('');

const services = [
  { icon: '▥', color: 'bg-[#eadac7]', title: 'Shower Install or Upgrade', tagline: 'Sleek, Stylish, Comfortable, and Efficient', description: "If you want to boost your home's value on the market, there are few better ways of doing that than revamping your whole bathroom." },
  { icon: '▤', color: 'bg-[#c9f0fa]', title: 'Bathtub to Shower Conversion', tagline: 'Save Space, Money, Have Peace of Mind', description: 'Sometimes, the best thing to do with an outdated tub is to convert it into something better. A bathtub to shower conversion allows you to easily modernize your bathing experience.' },
  { icon: '⌁', color: 'bg-[#d6e3e9]', title: 'Walk-In Tub Installation or Conversion', tagline: 'The Bathtub Made Safer and Simpler', description: 'Walk-in tubs present an innovative solution that makes getting into the tub as safe as it is easy.' }
];

const benefits = [
  { title: 'Added value', description: 'According to Remodeler Magazine, homeowners can recoup at least 66% of bathroom remodel costs when the house is sold!' },
  { title: 'Styling', description: "A bathroom project is a great opportunity to spruce up your bathroom's styling and provide a newer and more updated appearance." },
  { title: 'Maximize functionality', description: 'Superior craftsmanship and quality means better durability for your bathroom and makes making better use of limited bathroom space.' },
  { title: 'Easy and Fast', description: 'There are many simple projects that can be done in just a day and yet will make a big difference in your daily bathroom experience.' }
];

function goToEstimate() {
  if (zipcode.value) navigateTo(`/get-started/?zipcode=${zipcode.value}`);
}
</script>
