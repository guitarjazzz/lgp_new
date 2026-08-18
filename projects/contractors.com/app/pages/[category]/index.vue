<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { baseConfig } from '@global/app/utils/page-flow';
import { findCategoryBySlug, subcategoryPath } from '@global/app/utils/taxonomy-routes';

const route = useRoute();
const router = useRouter();
const answers = useFlowAnswers();

const category = computed(() => findCategoryBySlug(baseConfig.taxonomy.categories, String(route.params.category)));

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' });
}

watchEffect(() => {
  if (category.value) answers.value.category = category.value.name;
});

const selectSubcategory = (name: string) => {
  if (!category.value) return;
  answers.value.subcategory = name;
  router.push(subcategoryPath(category.value.name, name));
};
</script>

<template>
  <section class="mx-auto w-full max-w-2xl py-8 sm:py-14">
    <h1 class="text-3xl font-semibold tracking-tight text-gray-950">{{ category?.name }}: what service do you need?</h1>
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
    <NuxtLink class="mt-6 inline-block text-sm font-medium text-blue-700" to="/categories">Back</NuxtLink>
  </section>
</template>
