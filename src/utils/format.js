function vndCurrency(number) {
  return number.toLocaleString('it-IT', {
    style : 'currency', currency : 'VND',
  });
}

export { vndCurrency, };