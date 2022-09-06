const getBadgeColor = (value) => {
  if (value <= 1) {
    return 'red';
  } else if (value == 2) {
    return 'orange'
  } else if (value == 3) {
    return 'yellow'
  }

  return null;
}

const getWeekBadgeColor = (date) => {
  // Get current week
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

  return getBadgeColor(date - week);
}

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => {
    return {
      title: 'Bellier',
      icon: './images/stairs.svg',
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 120,
      },
    };
  },
  'card-badges': (t, opts) => {
    let cardId, commandDate, prodDate, installDate;
    return t
      .card('id')
      .get('id')
      .then((data) => {
        cardId = data;
        return t.get(cardId, 'shared', 'command-date');
      })
      .then((data) => {
        if (data !== undefined && data !== '') {
          commandDate = Number(data.slice(-2));
        }
        return t.get(cardId, 'shared', 'prod-date');
      })
      .then((data) => {
        if (data !== undefined && data !== '') {
          prodDate = Number(data.slice(-2));
        }
        return t.get(cardId, 'shared', 'install-date');
      })
      .then((data) => {
        if (data !== undefined && data !== '') {
          installDate = data;
        }

        // Now, build badges list
        const badges = [];

        if (commandDate !== undefined) {
          badges.push({
            text: 'S' + commandDate,
            icon: './images/buy.svg',
            color: getWeekBadgeColor(commandDate),
          })
        }

        if (prodDate !== undefined) {
          badges.push({
            text: 'S' + prodDate,
            icon: './images/build.svg',
            color: getWeekBadgeColor(prodDate),
          })
        }

        if (installDate !== undefined) {
          badges.push({
            text: installDate,
            icon: './images/home-build.svg',
            color: null,
          })
        }

        return badges;
      })
      .catch((error) => console.error(error));
  },
  'list-sorters': (t) => {
    return t
      .list('id')
      .then(() => {
        return [{
          text: 'Date de fabrication',
          callback: async (t, opts) => {
            const cards = [];

            for (const c of opts.cards) {
              const date = await t.get(c.id, 'shared', 'prod-date');
              date ? Number(date.slice(-2)) : 60;
              cards.push({
                id: c.id,
                date
              })
            }

            cards.sort((a, b) => {
              if (a.date > b.date) {
                return 1;
              } else if (b.date > a.date) {
                return -1;
              }
              return 0;
            });

            return {
              sortedIds: cards.map((c) => {
                return c.id;
              })
            };
          }
        }];
      });
  }
});