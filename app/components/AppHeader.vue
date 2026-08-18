<script setup lang="ts">
defineProps<{ userName?: string }>()

const emit = defineEmits<{ signOut: [] }>()
</script>

<template>
  <header class="flex h-14 items-center justify-between bg-gray-800 px-5 text-gray-50">
    <NuxtLink to="/" class="text-xl font-bold tracking-widest text-inherit no-underline">
      LGP
    </NuxtLink>

    <div class="flex items-center gap-3">
      <span class="text-sm">{{ userName ?? 'Guest' }}</span>
      <button
        type="button"
        class="cursor-pointer rounded border border-gray-600 bg-transparent px-3 py-1.5 text-[13px] text-gray-50 hover:bg-gray-700"
        @click="emit('signOut')"
      >
        Sign out
      </button>
    </div>
  </header>
</template>
