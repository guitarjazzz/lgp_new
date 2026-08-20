<template>
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
</template>

<script setup lang="ts">
const benefits = [
  { title: 'Added value', description: 'According to Remodeler Magazine, homeowners can recoup at least 66% of bathroom remodel costs when the house is sold!' },
  { title: 'Styling', description: "A bathroom project is a great opportunity to spruce up your bathroom's styling and provide a newer and more updated appearance." },
  { title: 'Maximize functionality', description: 'Superior craftsmanship and quality means better durability for your bathroom and makes making better use of limited bathroom space.' },
  { title: 'Easy and Fast', description: 'There are many simple projects that can be done in just a day and yet will make a big difference in your daily bathroom experience.' }
];
</script>