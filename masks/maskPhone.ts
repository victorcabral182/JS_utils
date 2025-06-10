export function maskPhone(value: string) {
  if (!value) return '--';
  let phone = value.replace(/\D/g, '');
  phone = phone.replace(/^0/, '').slice(0, 11);
  if (phone.length === 11) {
    return phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  }
  if (phone.length === 10) {
    return phone.replace(/^(\d\d)(\d{4})(\d{4}).*/, '($1) $2-$3');
  }
  return phone;
}
