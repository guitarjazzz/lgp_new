<script setup lang="ts">
import { computed } from 'vue';
import { baseConfig } from '@global/app/utils/page-flow';

const answers = useFlowAnswers();
const { goNext, goPrevious } = usePageFlow('subcategories');

const category = computed(() => baseConfig.taxonomy.categories.find((item) => item.name === answers.value.category));

const selectSubcategory = (name: string) => {
  answers.value.subcategory = name;
  goNext();
};
</script>

<template>
  <section class="mx-auto w-full max-w-2xl py-8 sm:py-14">
    <h1 class="text-3xl font-semibold tracking-tight text-gray-950">What service do you need?</h1>
    <div class="mt-6 space-y-3">
      <button
        v-for="subcategory in category?.subcategories ?? []"
        :key="subcategory"
        class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-gray-800 transition hover:border-blue-500"
        type="button"
        @click="selectSubcategory(subcategory)"
      >
        {{ subcategory }}
      </button>
    </div>
    <button class="mt-6 text-sm font-medium text-blue-700" type="button" @click="goPrevious">Back</button>
  </section>
</template>
