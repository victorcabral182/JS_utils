export const buildQueryParams = <T extends Record<string, any>>(filters: Partial<T>) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== "")
  );
};
