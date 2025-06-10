export const maskCNPJ = (e: string) => {
  let value = e;
  if (!value) {
    return null;
  }
  value
    ?.replace(/\D/g, '')
    ?.replace(/(\d{2})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d{1,2})/, '$1/$2')
    ?.replace(/(\d{4})(\d{1,2})/, '$1-$2')
    ?.slice(0, 18);
  return value;
};
