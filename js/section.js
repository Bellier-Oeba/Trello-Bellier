const trello = window.TrelloPowerUp.iframe();

const prod = document.getElementById('prod');
const command = document.getElementById('command');
const install = document.getElementById('install');

prod.addEventListener('change', () => {
  let week = Number(prod.value.slice(-2)) - 2;
  let year = prod.value.slice(0, 4);

  command.value = year + '-W' + week;

  trello.set('card', 'shared', 'prod-date', prod.value);
  trello.set('card', 'shared', 'command-date', command.value);
});

install.addEventListener('change', () => {
  trello.set('card', 'shared', 'install-date', install.value);
});

trello.get('card', 'shared', 'command-date')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
    command.value = data;
  });

trello.get('card', 'shared', 'prod-date')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
    prod.value = data;
  });

trello.get('card', 'shared', 'install-date')
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
    install.value = data;
  });