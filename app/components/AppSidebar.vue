<script setup lang="ts">
const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Sites', to: '/sites' },
  { label: 'Templates', to: '/templates' },
  { label: 'Settings', to: '/settings' },
  { label: 'Taxonomy', to: '/taxonomy'},
  { label: 'Constants', to: '/constants'}
]
</script>

<template>
  <aside class="w-50 shrink-0 bg-gray-900 px-3 py-4">
    <nav>
      <ul class="m-0 list-none p-0">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="mb-1 block rounded px-3 py-2.5 text-sm text-gray-300 no-underline hover:bg-gray-800 hover:text-white"
            active-class="bg-blue-600 text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
