export type TaxonomyCategory = {
  name: string;
  id?: string;
  subcategories: string[];
};

/** Converts a taxonomy name into a URL-safe slug (spaces/underscores -> hyphens). Shared across all sites. */
export const slugify = (value: string) => value
  .trim()
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[_\s]+/g, '-')
  .replace(/[^a-z0-9-]+/g, '')
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '');

/** Finds a category by slug, exact name or id. */
export const findCategoryBySlug = <T extends TaxonomyCategory>(categories: T[], slug: string) =>
  categories.find((category) => slugify(category.name) === slug || category.id === slug);

/** Finds a subcategory name by slug inside a category. */
export const findSubcategoryBySlug = (category: TaxonomyCategory | undefined, slug: string) =>
  category?.subcategories.find((subcategory) => slugify(subcategory) === slug);

export const categoryPath = (categoryName: string) => `/${slugify(categoryName)}`;

export const subcategoryPath = (categoryName: string, subcategoryName: string) =>
  `/${slugify(categoryName)}/${slugify(subcategoryName)}`;

/** Resolves `[category]` / `[subcategory]` route params into taxonomy entries. */
export const resolveTaxonomyRoute = <T extends TaxonomyCategory>(
  params: Record<string, unknown>,
  categories: T[],
  query: Record<string, unknown> = {}
) => {
  const routeParam = (value: unknown) => {
    if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : undefined;
    return typeof value === 'string' ? value : undefined;
  };
  const categorySlug = routeParam(params.category ?? params.category_id ?? query.category);
  const subcategorySlug = routeParam(params.subcategory ?? params.subcategory_id ?? query.subcategory);
  const category = categorySlug ? findCategoryBySlug(categories, categorySlug) : undefined;
  const subcategory = findSubcategoryBySlug(category, subcategorySlug ?? '');

  return { category, subcategory };
};
