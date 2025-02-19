// Map of URL slugs to category IDs
export const CATEGORY_URL_MAP = {
  fitness: 1,
  art: 2,
  cafes: 3,
  entertainment: 4,
  education: 5,
  music: 6,
  gaming: 8,
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
