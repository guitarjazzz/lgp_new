<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold">Templates</h1>
      <button
        type="button"
        class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        @click="showEditor = !showEditor"
      >
        {{ showEditor ? 'Close editor' : 'Create template' }}
      </button>
    </div>

    <div v-if="showEditor" class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col">
        <label for="template-html" class="mb-1 text-sm font-medium text-gray-700">HTML</label>
        <textarea
          id="template-html"
          v-model="html"
          spellcheck="false"
          class="h-80 w-full rounded border border-gray-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div class="flex flex-col">
        <span class="mb-1 text-sm font-medium text-gray-700">Preview</span>
        <!-- sandboxed so template markup can't script against the admin app -->
        <iframe
          :srcdoc="html"
          sandbox=""
          title="Template preview"
          class="h-80 w-full rounded border border-gray-300 bg-white"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const showEditor = ref(false)
const html = ref('<h1>New template</h1>\n<p>Edit the HTML on the left.</p>')
</script>