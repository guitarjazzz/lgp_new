<template>
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full min-w-[780px] border-collapse text-left" role="treegrid" aria-label="Taxonomy tree">
                <thead>
                    <tr class="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <th class="w-[48%] px-5 py-3 font-semibold">Name</th>
                        <th class="px-4 py-3 font-semibold">Type</th>
                        <th class="px-4 py-3 font-semibold">Required</th>
                        <th class="px-4 py-3 font-semibold">Visible</th>
                        <th class="px-4 py-3 font-semibold">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="row in visibleRows"
                        :key="row.id"
                        class="border-b border-gray-100 last:border-0 hover:bg-blue-50/40"
                        :aria-level="row.depth + 1"
                        :aria-expanded="row.hasChildren ? expandedRows.has(row.id) : undefined"
                        role="row"
                    >
                        <td class="px-5 py-3" :style="{ paddingLeft: `${20 + row.depth * 28}px` }" role="gridcell">
                            <div class="flex items-center gap-2">
                                <button
                                    v-if="row.hasChildren"
                                    type="button"
                                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-gray-500 hover:bg-blue-100 hover:text-blue-700"
                                    :aria-label="`${expandedRows.has(row.id) ? 'Collapse' : 'Expand'} ${row.label}`"
                                    @click="toggleRow(row.id)"
                                >
                                    <span class="text-lg leading-none">{{ expandedRows.has(row.id) ? '&#8722;' : '&#43;' }}</span>
                                </button>
                                <span v-else class="h-6 w-6 shrink-0 text-center text-gray-300">&#8226;</span>
                                <div class="min-w-0">
                                    <div :class="row.kind === 'question' || row.kind === 'category' || row.kind === 'group' ? 'font-medium text-gray-900' : 'text-gray-700'">
                                        {{ row.label }}
                                    </div>
                                    <div v-if="row.secondary" class="truncate text-xs text-gray-400">{{ row.secondary }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600" role="gridcell">{{ row.type || '-' }}</td>
                        <td class="px-4 py-3 text-sm" role="gridcell">
                            <span v-if="row.kind === 'question'" :class="row.required ? 'text-blue-700' : 'text-gray-400'">
                                {{ row.required ? 'Yes' : 'No' }}
                            </span>
                            <span v-else class="text-gray-300">-</span>
                        </td>
                        <td class="px-4 py-3 text-sm" role="gridcell">
                            <span v-if="row.visible !== undefined" :class="row.visible ? 'text-emerald-700' : 'text-gray-400'">
                                {{ row.visible ? 'Shown' : 'Hidden' }}
                            </span>
                            <span v-else class="text-gray-300">-</span>
                        </td>
                        <td class="px-4 py-3 font-mono text-xs text-gray-500" role="gridcell">{{ row.value || '-' }}</td>
                    </tr>
                    <tr v-if="visibleRows.length === 0">
                        <td colspan="5" class="px-5 py-10 text-center text-sm text-gray-500">{{ emptyMessage || 'No entries found.' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
type TreeRow = {
    id: string;
    depth: number;
    kind: 'question' | 'answer' | 'category' | 'subcategory' | 'group';
    label: string;
    secondary?: string;
    type?: string;
    required?: boolean;
    visible?: boolean;
    value?: string;
    hasChildren: boolean;
};

const props = defineProps<{
    rows: TreeRow[];
    emptyMessage?: string;
}>();

const expandedRows = ref(new Set<string>());

const visibleRows = computed(() => props.rows.filter((row, rowIndex) => {
    let childDepth = row.depth;
    for (let ancestorIndex = rowIndex - 1; ancestorIndex >= 0; ancestorIndex -= 1) {
        const ancestor = props.rows[ancestorIndex];
        if (!ancestor || ancestor.depth >= childDepth) continue;
        if (ancestor.hasChildren && !expandedRows.value.has(ancestor.id)) return false;
        childDepth = ancestor.depth;
    }
    return true;
}));

const toggleRow = (rowId: string) => {
    const nextExpandedRows = new Set(expandedRows.value);
    if (nextExpandedRows.has(rowId)) nextExpandedRows.delete(rowId);
    else nextExpandedRows.add(rowId);
    expandedRows.value = nextExpandedRows;
};
</script>