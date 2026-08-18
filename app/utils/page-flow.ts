import baseConfigRaw from '../base.conf?raw';

export type TaxonomyCategory = {
  name: string;
  id: string;
  subcategories: string[];
};

export type TaxonomyQuestion = {
  type: 'radio' | 'text';
  options?: string[];
};

export type FlowPage = { name: string };

export type BaseConfig = {
  pages: FlowPage[];
  taxonomy: {
    categories: TaxonomyCategory[];
    questions: Record<string, TaxonomyQuestion>;
  };
};

export const baseConfig = JSON.parse(baseConfigRaw) as BaseConfig;
export const flowPages = baseConfig.pages;

/** The "home" page is served at the site root; every other page name is its own URL segment. */
export const pathForPageName = (name: string) => (name === 'home' ? '/' : `/${name}`);

export const flowPageIndex = (name: string) => flowPages.findIndex((page) => page.name === name);
