export const initQuestion = async () => {
  const baseConfig = await $fetch('/api/project/base-config', {method: "GET"});
  const getTaxonomy = (await import("../../HI_taxonomy.json")).default;
  return { 
    baseConfig,
    taxonomy: getTaxonomy
  };
};