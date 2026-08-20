<template>
  <div class="overflow-hidden bg-white">
    <BathroomHero />
    <BathroomServices :currentTaxonomy="currentTaxonomy"/>
    <BathroomProductSection title="Shower Install"
      description="Revamp your bathroom experience with a sleek new shower in two days or less. A modern, high-quality shower fixture can be fitted by our qualified specialists in just the space of one day."
      cost-range="$10,000 - $15,000"
      image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
      image-alt="Modern bathroom with glass shower" />
    <BathroomBenefits />
    <BathroomProductSection title="Walk-In Tubs"
      description="Walk-in tubs are a great way to make your bathing experience safer, easier, and more soothing. They are the perfect solution for those who have mobility issues but want to stay independent."
      cost-range="$15,000 - $20,000"
      image="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85"
      image-alt="Accessible walk-in bathtub" image-on-right />
    <BathroomEstimateCta />
    <BathroomQuotes />
  </div>
</template>
<script setup lang="ts">
const currentTaxonomy = getTaxonomy({ category: 'Bathroom Remodeling' })
console.log(currentTaxonomy)
</script>