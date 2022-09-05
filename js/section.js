let prod = document.getElementById('prod');
let command = document.getElementById('command');

prod.addEventListener('change', () => {
  let week = Number(prod.value.slice(-2)) - 2;
  let year = prod.value.slice(0, 4);

  command.value = year + '-W' + week;
});