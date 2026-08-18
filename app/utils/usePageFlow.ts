import { computed } from 'vue';
import { baseConfig, flowPageIndex, flowPages, pathForPageName } from './page-flow';
import { categoryPath, resolveTaxonomyRoute } from './taxonomy-routes';

export type FlowAnswers = {
  zipcode: string;
  category: string;
  subcategory: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

export const useFlowAnswers = () => useState<FlowAnswers>('contractors-flow-answers', () => ({
  zipcode: '',
  category: '',
  subcategory: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
}));

/** Navigation driven by the `pages` order declared in base.conf. */
export const usePageFlow = (currentName: string) => {
  const router = useRouter();
  const route = useRoute();
  const answers = useFlowAnswers();

  const marketingTaxonomy = resolveTaxonomyRoute(
    route.params,
    baseConfig.taxonomy.categories,
    route.query
  );
  if (marketingTaxonomy.category) answers.value.category = marketingTaxonomy.category.name;
  if (marketingTaxonomy.subcategory) answers.value.subcategory = marketingTaxonomy.subcategory;

  const currentIndex = flowPageIndex(currentName);
  const nextPage = computed(() => {
    let nextIndex = currentIndex + 1;
    while (
      nextIndex < flowPages.length &&
      ((flowPages[nextIndex].name === 'categories' && answers.value.category) ||
        (flowPages[nextIndex].name === 'subcategories' && answers.value.subcategory))
    ) {
      nextIndex += 1;
    }
    return flowPages[nextIndex];
  });
  const previousPage = computed(() => flowPages[currentIndex - 1]);

  // "subcategories" is actually reached via the /[category]/[subcategory] slug route, not its literal name.
  const pathForPreviousPage = () => {
    const page = previousPage.value;
    if (!page) return undefined;
    if (page.name === 'subcategories' && answers.value.category) return categoryPath(answers.value.category);
    return pathForPageName(page.name);
  };

  const goNext = () => (nextPage.value
    ? router.push({ path: pathForPageName(nextPage.value.name), query: route.query })
    : undefined);
  const goPrevious = () => {
    const path = pathForPreviousPage();
    return path ? router.push({ path, query: route.query }) : undefined;
  };

  return { nextPage, previousPage, goNext, goPrevious };
};
