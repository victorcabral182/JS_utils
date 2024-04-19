export function formatarPlaca(placa: string) {
  placa = placa.replace(/[^a-zA-Z0-9]/g, '').slice(0, 7);
  if (/^[0-9]{3}/.test(placa)) {
    placa = placa.slice(3);
  }
  if (/^[a-zA-Z]{4,}/.test(placa)) {
    placa = placa.slice(0, 3);
  }
  if (/^[a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2}$/.test(placa)) {
    return placa.replace(
      /^([a-zA-Z]{3})([0-9])([a-zA-Z])([0-9]{2})$/,
      '$1-$2$3$4',
    );
  } else if (/^[a-zA-Z]{3}[0-9]{4}$/.test(placa)) {
    return placa.replace(/^([a-zA-Z]{3})([0-9]{4})$/, '$1-$2');
  } else {
    return placa.toUpperCase();
  }
}
