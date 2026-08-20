<template>
  <section class="bg-[#f0f5f7] px-6 py-14 sm:px-12 sm:py-20">
    <div class="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
      <article v-for="(service, index) in currentTaxonomy.subCategories" :key="service.id" class="text-center">
        <template v-if="services[index]">
          <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            :class="services[index].color">{{ services[index].icon }}</div>
          <h3 class="mx-auto max-w-[220px] text-lg font-extrabold leading-tight text-[#15578d]">{{ service.name }}</h3>
          <p class="mt-3 text-xs font-semibold text-slate-700">{{ services[index].tagline }}</p>
          <p class="mt-4 text-sm leading-relaxed text-slate-700">{{ services[index].description }}</p>
          <button type="button" @click="selectService(service)"
            class="mt-5 inline-block rounded-full border border-[#15578d] px-4 py-2 text-xs font-bold text-[#15578d] hover:bg-[#15578d] hover:text-white">
            Get Started Today</button>
        </template>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { currentTaxonomy } = defineProps<{ currentTaxonomy: any }>();
const data = collectData({ category: "", subcategory: "" });
data.value.category = currentTaxonomy.name;

const selectService = (service: any) => {
  data.value.subcategory = service.name;
  navigateTo({ path: '/get-started' });
};

const services:any = [
  { icon: '▥', color: 'bg-[#eadac7]', title: 'Shower Install or Upgrade', tagline: 'Sleek, Stylish, Comfortable, and Efficient', description: "If you want to boost your home's value on the market, there are few better ways of doing that than revamping your whole bathroom." },
  { icon: '▤', color: 'bg-[#c9f0fa]', title: 'Bathtub to Shower Conversion', tagline: 'Save Space, Money, Have Peace of Mind', description: 'Sometimes, the best thing to do with an outdated tub is to convert it into something better. A bathtub to shower conversion allows you to easily modernize your bathing experience.' },
  { icon: '⌁', color: 'bg-[#d6e3e9]', title: 'Walk-In Tub Installation or Conversion', tagline: 'The Bathtub Made Safer and Simpler', description: 'Walk-in tubs present an innovative solution that makes getting into the tub as safe as it is easy.' }
];
</script>