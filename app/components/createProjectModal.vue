<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-6"
    role="dialog"
    aria-modal="true"
    @click.self="close"
  >
    <form class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl" @submit.prevent="submit">
      <h2 class="mb-4 text-xl font-semibold">New project</h2>

      <label class="mb-4 block">
        <span class="mb-1 block text-sm text-gray-600">Project name</span>
        <input
          v-model="projectName"
          class="w-full rounded-lg border border-gray-300 px-3 py-2"
          type="text"
          required
          :disabled="isCreating"
        >
      </label>

      <label class="mb-4 block">
        <span class="mb-1 block text-sm text-gray-600">Default template</span>
        <input
          v-model="form.defaultTemplate"
          class="w-full rounded-lg border border-gray-300 px-3 py-2"
          type="text"
          :disabled="isCreating"
        >
      </label>

      <fieldset class="mb-4">
        <legend class="mb-2 text-sm text-gray-600">Pages</legend>
        <div v-for="(page, index) in form.pages" :key="index" class="mb-2 flex gap-2">
          <input
            v-model="page.name"
            class="w-1/2 rounded-lg border border-gray-300 px-3 py-2"
            type="text"
            placeholder="Name"
            :disabled="isCreating"
          >
          <input
            v-model="page.path"
            class="w-1/2 rounded-lg border border-gray-300 px-3 py-2"
            type="text"
            placeholder="path"
            :disabled="isCreating"
          >
          <button
            type="button"
            class="cursor-pointer rounded-lg border border-gray-300 px-3 text-gray-600 hover:bg-gray-100"
            :disabled="isCreating"
            @click="form.pages.splice(index, 1)"
          >
            &times;
          </button>
        </div>
        <button
          type="button"
          class="cursor-pointer text-sm text-blue-700 underline underline-offset-2"
          :disabled="isCreating"
          @click="form.pages.push({ name: '', path: '' })"
        >
          Add page
        </button>
      </fieldset>

      <label v-if="availableComponents.length" class="mb-4 block">
        <span class="mb-1 block text-sm text-gray-600">Components</span>
        <select
          v-model="form.components"
          class="w-full rounded-lg border border-gray-300 px-3 py-2"
          multiple
          size="5"
          :disabled="isCreating"
        >
          <option v-for="component in availableComponents" :key="component.name" :value="component.name">
            {{ component.name }}
          </option>
        </select>
      </label>

      <fieldset v-if="form.dependencies.length" class="mb-6">
        <legend class="mb-2 text-sm text-gray-600">Dependencies</legend>
        <div v-for="(dependency, index) in form.dependencies" :key="index" class="mb-2 flex items-center gap-2">
          <input v-model="dependency.enabled" type="checkbox" :disabled="isCreating">
          <input
            v-model="dependency.name"
            class="w-1/2 rounded-lg border border-gray-300 px-3 py-2"
            type="text"
            placeholder="package"
            :disabled="isCreating"
          >
          <input
            v-model="dependency.version"
            class="w-1/3 rounded-lg border border-gray-300 px-3 py-2"
            type="text"
            placeholder="version"
            :disabled="isCreating"
          >
        </div>
      </fieldset>

      <p v-if="createError" class="mb-4 text-sm text-red-600">{{ createError }}</p>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          class="cursor-pointer rounded-full border border-gray-300 px-4 py-2"
          :disabled="isCreating"
          @click="close"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white cursor-pointer disabled:cursor-wait disabled:opacity-60"
          :disabled="isCreating"
          :aria-busy="isCreating"
        >
          <span v-if="isCreating" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
          {{ isCreating ? 'Creating...' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
type Project = { name: string; link: string | null };
type TemplateComponent = { name: string; path: string };
type BaseConfig = {
  defaultTemplate?: string;
  dependencies?: Record<string, string>;
  pages?: { name: string; path: string }[];
  components?: Record<string, { path: string }>;
};

const open = defineModel<boolean>('open', { default: false });
const emit = defineEmits<{ created: [project: Project] }>();

const projectName = ref('');
const isCreating = ref(false);
const createError = ref('');
const availableComponents = ref<TemplateComponent[]>([]);
const form = reactive({
  defaultTemplate: '',
  pages: [] as { name: string; path: string }[],
  components: [] as string[],
  dependencies: [] as { name: string; version: string; enabled: boolean }[]
});

const loadBaseConfig = async () => {
  createError.value = '';
  projectName.value = '';

  const [config, components] = await Promise.all([
    $fetch<BaseConfig>('/api/project/base-config'),
    $fetch<TemplateComponent[]>('/api/project/components')
  ]);

  availableComponents.value = components;
  form.defaultTemplate = config.defaultTemplate ?? '';
  form.pages = (config.pages ?? []).map((page) => ({ ...page }));
  form.components = components
    .filter((component) => component.name in (config.components ?? {}))
    .map((component) => component.name);
  form.dependencies = Object.entries(config.dependencies ?? {})
    .map(([name, version]) => ({ name, version, enabled: true }));
};

watch(open, (isOpen) => {
  if (isOpen) loadBaseConfig();
}, { immediate: true });

const close = () => {
  if (isCreating.value) return;
  open.value = false;
};
const submit = async () => {
  if (isCreating.value) return;
  isCreating.value = true;
  createError.value = '';

  try {
    const response = await fetch('/api/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectName.value,
        config: {
          defaultTemplate: form.defaultTemplate,
          pages: form.pages.filter((page) => page.name.trim()),
          components: Object.fromEntries(
            availableComponents.value
              .filter((component) => form.components.includes(component.name))
              .map((component) => [component.name, { path: component.path }])
          ),
          dependencies: Object.fromEntries(
            form.dependencies.filter((item) => item.enabled && item.name.trim()).map((item) => [item.name, item.version])
          )
        }
      })
    });
    if (!response.ok) {
      createError.value = 'Project creation failed';
      return;
    }

    const responseData = await response.json();
    emit('created', responseData.data);
    projectName.value = '';
    open.value = false;
  } finally {
    isCreating.value = false;
  }
};
</script>
