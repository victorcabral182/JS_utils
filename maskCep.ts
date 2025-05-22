export function formatCEP(valor: string): string {
  const numeros = valor.replace(/\D/g, '');

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 5) {
    return numeros.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
  }

  return numeros.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3').slice(0, 10);
}
