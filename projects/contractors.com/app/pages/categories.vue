<script setup lang="ts">
import { baseConfig } from '@global/app/utils/page-flow';
import { categoryPath } from '@global/app/utils/taxonomy-routes';

const answers = useFlowAnswers();
const { goPrevious } = usePageFlow('categories');
const router = useRouter();

const selectCategory = (name: string) => {
  answers.value.category = name;
  answers.value.subcategory = '';
  router.push(categoryPath(name));
};
</script>

<template>
  <section class="mx-auto w-full max-w-2xl py-8 sm:py-14">
    <h1 class="text-3xl font-semibold tracking-tight text-gray-950">What type of project do you need help with?</h1>
    <div class="mt-6 space-y-3">
      <button
        v-for="category in baseConfig.taxonomy.categories"
        :key="category.id"
        class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-gray-800 transition hover:border-blue-500"
        type="button"
        @click="selectCategory(category.name)"
      >
        {{ category.name }}
      </button>
    </div>
    <button class="mt-6 text-sm font-medium text-blue-700" type="button" @click="goPrevious">Back</button>
  </section>
</template>
