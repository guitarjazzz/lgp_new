import taxonomy from '../../public/taxonomy.json'

export interface TaxonomyAnswer {
    id: string
    text: string
    value: string
    default: boolean
}

export interface TaxonomyQuestion {
    id: string
    name: string
    text: string
    collectionId: string | null
    parentQuestionId: string | null
    parentAnswerId: string | null
    inputType: string
    show: boolean
    required: boolean
    answers: TaxonomyAnswer[]
}

export interface TaxonomySubCategory {
    id: string
    name: string
    show: boolean
    questions: TaxonomyQuestion[]
    features: unknown[]
    images: unknown[]
}

export interface TaxonomyCategory extends TaxonomySubCategory {
    subCategories: TaxonomySubCategory[]
}

export interface Taxonomy {
    version: string
    success: boolean
    questions: TaxonomyQuestion[]
    features: unknown[]
    images: unknown[]
    contacts: unknown[]
    collections: unknown[]
    categories: TaxonomyCategory[]
}

export interface GetTaxonomyParams {
    /** Category id or name (case-insensitive). */
    category?: string
    /** Subcategory id or name — returns that single subcategory. */
    subCategory?: string
    /** Limit the returned `subCategories` to these ids or names, in the given order. */
    subCategories?: string[]
    /** Include entries hidden with `show: false`. Defaults to false. */
    includeHidden?: boolean
}

const data = taxonomy as unknown as Taxonomy

const matches = (item: { id: string; name: string }, key: string) => {
    const value = key.trim().toLowerCase()
    return item.id.toLowerCase() === value || item.name.toLowerCase() === value
}


// getTaxonomy()                                              // full taxonomy
// getTaxonomy({ category: '63' })                            // by id
// getTaxonomy({ category: 'Bathroom Remodeling' })           // by name -> category + visible subCategories
// getTaxonomy({ category: '127', subCategories: ['258', 'Whole Home Water System'] }) // only those subs, in order
// getTaxonomy({ category: '127', subCategory: 'Water Softener' })  // single subcategory
// getTaxonomy({ subCategory: '258' })                        // subcategory lookup across all categories
// getTaxonomy({ category: '127', includeHidden: true })      // keep show: false entries
export function getTaxonomy(): Taxonomy
export function getTaxonomy(params: GetTaxonomyParams): TaxonomyCategory | TaxonomySubCategory | undefined
export function getTaxonomy(params?: GetTaxonomyParams) {
    if (!params || (!params.category && !params.subCategory)) return data

    const { category, subCategory, subCategories, includeHidden } = params

    if (!category) {
        return data.categories
            .flatMap((item) => item.subCategories)
            .find((item) => matches(item, subCategory!))
    }

    const found = data.categories.find((item) => matches(item, category))
    if (!found) return undefined

    if (subCategory) return found.subCategories.find((item) => matches(item, subCategory))

    const available = includeHidden ? found.subCategories : found.subCategories.filter((item) => item.show)

    return {
        ...found,
        subCategories: subCategories
            ? subCategories
                  .map((key) => available.find((item) => matches(item, key)))
                  .filter((item): item is TaxonomySubCategory => Boolean(item))
            : available,
    }
}
