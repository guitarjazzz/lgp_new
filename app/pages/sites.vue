<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold">Sites</h1>
    <div class="mt-6 flex gap-3">
      <button
        type="button"
        class="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white cursor-pointer"
        @click="isModalOpen = true"
      >
        Create Project
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="border-b border-gray-300 text-sm text-gray-500">
            <th class="px-4 py-3 font-medium">№</th>
            <th class="px-4 py-3 font-medium">Project name</th>
            <th class="px-4 py-3 font-medium">Link</th>
            <th class="px-4 py-3 font-medium">Dev</th>
            <th class="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in allProjects" :key="project.name" class="border-b border-gray-200">
            <td class="px-4 py-4 text-gray-500">{{ index + 1 }}</td>
            <td class="px-4 py-4 font-medium">{{ project.name }}</td>
            <td class="px-4 py-4">
              <a
                v-if="project.link"
                class="text-blue-700 underline underline-offset-2 hover:text-blue-900"
                :href="project.link"
                target="_blank"
                rel="noreferrer"
              >
                {{ project.link }}
              </a>
              <span v-else class="text-gray-400">Not running</span>
            </td>
            <td class="px-4 py-4">
              <button
                type="button"
                class="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                @click="runDev(project.name)"
              >
                run
              </button>
              <button
                type="button"
                class="ml-2 px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                @click="buildProject(project.name)"
              >
                build
              </button>
            </td>
            <td class="px-4 py-4 text-right">
              <button
                type="button"
                class="mr-3 cursor-pointer rounded-sm border-1 px-2 py-1 text-lg text-gray-600 hover:bg-black hover:text-white"
                :aria-label="`Edit ${project.name}`"
                :title="`Edit ${project.name}`"
                @click="editProject(project.name)"
              >
                &#9998;
              </button>
              <button
                type="button"
                class="cursor-pointer rounded-sm border-1 px-2 py-1 text-lg text-red-600 hover:bg-red-600 hover:text-white"
                :aria-label="`Delete ${project.name}`"
                :title="`Delete ${project.name}`"
                @click="deleteProject(project.name)"
              >
                &#128465;
              </button>
            </td>
          </tr>
          <tr v-if="allProjects.length === 0">
            <td class="px-4 py-6 text-center text-gray-500" colspan="4">No projects yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <CreateProjectModal v-model:open="isModalOpen" @created="allProjects.push($event)" />
  </div>
</template>
<script setup lang="ts">
type Project = { name: string; link: string | null };

const { data } = await useFetch<Project[]>('/api/project/get-all')

const allProjects = ref<Project[]>(data.value ?? []);
const isModalOpen = ref(false);
const editProject = async (project: string) => {
  const newName = window.prompt('Project name', project)?.trim();
  if (!newName || newName === project) return;

  const response = await fetch('/api/project/rename', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldName: project, newName })
  });
  if (!response.ok) return;

  const projectIndex = allProjects.value.findIndex((item) => item.name === project);
  const currentProject = allProjects.value[projectIndex];
  if (currentProject) allProjects.value[projectIndex] = { ...currentProject, name: newName };
};
const deleteProject = async (project: string) => {
  if (!window.confirm(`Delete ${project}?`)) return;

  const response = await fetch('/api/project/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: project })
  });
  if (!response.ok) return;

  allProjects.value = allProjects.value.filter((item) => item.name !== project);
};
const runDev = async (project: string) => {
  const response = await fetch('/api/project/run-dev', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: project })
  });
  if (!response.ok) return;

  const responseData = await response.json();
  
  // Update the project link with the dev server URL
  const projectIndex = allProjects.value.findIndex((item) => item.name === project);
  const currentProject = allProjects.value[projectIndex];
  if (currentProject && responseData.link) {
    allProjects.value[projectIndex] = {
      ...currentProject,
      link: responseData.link
    };
  }
};
const buildProject = async (project: string) => {
  const response = await fetch('/api/project/build', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: project })
  });
  if (!response.ok) return;

  const responseData = await response.json();
  const projectIndex = allProjects.value.findIndex((item) => item.name === project);
  const currentProject = allProjects.value[projectIndex];
  if (currentProject && responseData.link) {
    allProjects.value[projectIndex] = {
      ...currentProject,
      link: responseData.link
    };
  }
};
</script>