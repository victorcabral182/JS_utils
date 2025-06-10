export const maskCurrencyBr = (e: string) => {
  let value = e?.target?.value
  if (!value) {
    return "R$ 0,00
  }
  value?.replace(/\D/g, '')
    ?.replace(/(\d)(\d{2})$/, '$1,$2')
    ?.replace(/(?=(\d{3})+(\D))\B/g, '.'
  )
  return 'R$ ' + value                                       
}
