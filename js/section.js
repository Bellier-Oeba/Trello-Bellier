const trello = window.TrelloPowerUp.iframe();

const prod = document.getElementById('prod');
const command = document.getElementById('command');
const install = document.getElementById('install');

const weekToSubtract = 2;

const subtractWeeks = (date) => {
  const week = Number(date.slice(-2));
  const year = Number(date.slice(0, 4));
  
  let newDate = new Date(year, 0).getTime() + week * 7 * 24 * 60 * 60 * 1000
  newDate = newDate - (weekToSubtract * 604800000)
  
  const now = new Date(newDate);
  const onejan = new Date(now.getFullYear(), 0, 1);
  let weekNumber = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7) - 1;

  if (weekNumber === 0) weekNumber = 1

  return now.getFullYear() + '-W' + ('00' + weekNumber).slice(-2);
}

prod.addEventListener('change', () => {
  command.value = subtractWeeks(prod.value);

  trello.set('card', 'shared', 'prod-date', prod.value);
  trello.set('card', 'shared', 'command-date', command.value);
});

install.addEventListener('change', () => {
  trello.set('card', 'shared', 'install-date', install.value);
});

trello.get('card', 'shared', 'command-date')
  .then((data) => {
    command.value = data;
  });

trello.get('card', 'shared', 'prod-date')
  .then((data) => {
    prod.value = data;
  });

trello.get('card', 'shared', 'install-date')
  .then((data) => {
    install.value = data;
  });