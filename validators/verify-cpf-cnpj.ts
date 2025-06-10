export function validateDocument(value: string) {
  // Remove caracteres não numéricos
  const numeros = value.replace(/\D/g, '');

  // Verifica se é CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (numeros.length === 11) {
    return validateCpf(numeros);
  } else if (numeros.length === 14) {
    return validateCnpj(numeros);
  } else {
    return false;
  }
}

function validateCpf(cpf: string) {
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function validateCnpj(cnpj: string) {
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Calcula o primeiro dígito verificador
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos1[i];
  }
  let resto = soma % 11;
  const dv1 = resto < 2 ? 0 : 11 - resto;
  if (dv1 !== parseInt(cnpj.charAt(12))) return false;

  // Calcula o segundo dígito verificador
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos2[i];
  }
  resto = soma % 11;
  const dv2 = resto < 2 ? 0 : 11 - resto;
  if (dv2 !== parseInt(cnpj.charAt(13))) return false;

  return true;
}
