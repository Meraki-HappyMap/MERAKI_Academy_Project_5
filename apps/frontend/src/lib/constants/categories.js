// Map of URL slugs to category IDs
export const CATEGORY_URL_MAP = {
  gaming: 8,
  cafes: 10,
  fitness: 11,
  music: 12,
  art: 13,
  sports: 14,
  restaurants: 15,
  parks:16,
  shopping:17,
  events:18,
  cycling:19,
  camping:20,
};

export const getCategoryBySlug = (slug) => {
  const categoryId = CATEGORY_URL_MAP[slug?.toLowerCase()];
  return categoryId ? categoryId : null;
};

export const getCategoryById = (id) => {
  const categoryEntry = Object.entries(CATEGORY_URL_MAP).find(
    ([, value]) => value === id
  );
  return categoryEntry ? categoryEntry[0] : null;
};
