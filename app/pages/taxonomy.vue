<script setup lang="ts">
type TaxonomyAnswer = {
    id: string;
    text: string;
    value: string;
    default: boolean;
};

type TaxonomyQuestion = {
    id: string;
    name: string;
    text: string;
    inputType: string;
    show: boolean;
    required: boolean;
    parentQuestionId: string | null;
    parentAnswerId: string | null;
    answers: TaxonomyAnswer[];
};

type TaxonomySubCategory = {
    id: string;
    name: string;
    show: boolean;
    questions: TaxonomyQuestion[];
};

type TaxonomyCategory = TaxonomySubCategory & {
    subCategories: TaxonomySubCategory[];
};

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

const { taxonomy } = await initQuestion();
const questions = taxonomy.questions as TaxonomyQuestion[];
const categories = taxonomy.categories as TaxonomyCategory[];

const questionRows = (sourceQuestions: TaxonomyQuestion[], prefix: string, depth: number): TreeRow[] => {
    const result: TreeRow[] = [];
    const addQuestion = (question: TaxonomyQuestion, questionDepth: number) => {
        result.push({
            id: `${prefix}:question:${question.id}`,
            depth: questionDepth,
            kind: 'question',
            label: question.text,
            secondary: question.name,
            type: question.inputType,
            required: question.required,
            visible: question.show,
            hasChildren: question.answers.length > 0
        });

        for (const answer of question.answers) {
            const childQuestions = sourceQuestions.filter(
                (child) => child.parentQuestionId === question.id && child.parentAnswerId === answer.id
            );
            result.push({
                id: `${prefix}:answer:${question.id}:${answer.id}`,
                depth: questionDepth + 1,
                kind: 'answer',
                label: answer.text,
                secondary: `Answer ${answer.id}`,
                value: answer.value,
                hasChildren: childQuestions.length > 0
            });
            for (const childQuestion of childQuestions) addQuestion(childQuestion, questionDepth + 2);
        }
    };

    for (const question of sourceQuestions.filter((item) => item.parentQuestionId === null)) {
        addQuestion(question, depth);
    }
    return result;
};

const mainQuestionRows = questionRows(questions, 'main', 0);

const categoryRows = computed<TreeRow[]>(() => {
    const result: TreeRow[] = [];
    const addCategory = (category: TaxonomyCategory, depth: number, parentId: string) => {
        const categoryId = `${parentId}:category:${category.id}`;
        const categoryQuestions = questionRows(category.questions, `${categoryId}:questions`, depth + 2);
        result.push({
            id: categoryId,
            depth,
            kind: 'category',
            label: category.name,
            secondary: `Category ${category.id}`,
            visible: category.show,
            hasChildren: category.subCategories.length > 0 || categoryQuestions.length > 0
        });

        const sortedSubCategories = [...category.subCategories].sort((left, right) => left.name.localeCompare(right.name));
        if (sortedSubCategories.length > 0) {
            result.push({
                id: `${categoryId}:subcategories`,
                depth: depth + 1,
                kind: 'group',
                label: 'Subcategories',
                hasChildren: true
            });
            for (const subCategory of sortedSubCategories) {
                const subCategoryId = `${categoryId}:subcategory:${subCategory.id}`;
                const subCategoryQuestions = questionRows(subCategory.questions, subCategoryId, depth + 3);
                result.push({
                    id: subCategoryId,
                    depth: depth + 2,
                    kind: 'subcategory',
                    label: subCategory.name,
                    secondary: `Subcategory ${subCategory.id}`,
                    visible: subCategory.show,
                    hasChildren: subCategoryQuestions.length > 0
                });
                result.push(...subCategoryQuestions);
            }
        }

        if (categoryQuestions.length > 0) {
            result.push({
                id: `${categoryId}:questions`,
                depth: depth + 1,
                kind: 'group',
                label: 'Questions',
                hasChildren: true
            });
            result.push(...categoryQuestions);
        }
    };

    const sortedCategories = [...categories].sort((left, right) => left.name.localeCompare(right.name));
    for (const category of sortedCategories) addCategory(category, 0, 'categories');
    return result;
});
</script>

<template>
    <section class="space-y-8">
        <div>
            <p class="text-sm font-medium uppercase tracking-wider text-blue-700">Configuration</p>
            <h1 class="mt-1 text-2xl font-semibold text-gray-950">Taxonomy</h1>
            <p class="mt-1 text-sm text-gray-500">{{ questions.length }} main questions across {{ categories.length }} categories</p>
        </div>

        <section class="space-y-3">
            <div>
                <h2 class="text-lg font-semibold text-gray-950">Main Questions</h2>
                <p class="text-sm text-gray-500">Shared questions shown before a project category is selected.</p>
            </div>
            <TaxonomyTreeGrid :rows="mainQuestionRows" empty-message="No main questions found." />
        </section>

        <section class="space-y-3">
            <div>
                <h2 class="text-lg font-semibold text-gray-950">Categories</h2>
                <p class="text-sm text-gray-500">Category, subcategory, and category-specific questions.</p>
            </div>
            <TaxonomyTreeGrid :rows="categoryRows" empty-message="No categories found." />
        </section>
    </section>
</template>
