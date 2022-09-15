const trello = window.TrelloPowerUp.iframe();

const prod = document.getElementById('prod');
const command = document.getElementById('command');
const install = document.getElementById('install');

const getISOWeeks = (y) => {
  let d = new Date(y, 0, 1);
  let isLeap = new Date(y, 1, 29).getMonth() === 1;
  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}

prod.addEventListener('change', () => {
  let week = Number(prod.value.slice(-2));
  let year = prod.value.slice(0, 4);

  if(week === 1) {
    week = ('00' + getISOWeeks(year)).slice(-2) - 2
    year = year - 1
  } else if (week === 2) {
    week = ('00' + getISOWeeks(year)).slice(-2) - 1
    year = year - 1
  } else {
    week = ('00' + (week - 2)).slice(-2)
    console.log(week)
  }

  command.value = year + '-W' + week;

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