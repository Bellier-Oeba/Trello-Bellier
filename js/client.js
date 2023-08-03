const getWeekBadgeColor = (date) => {
  // Get year and week first
  const targetWeek = Number(date.slice(-2));
  const targetYear = Number(date.slice(0, 4));

  // Get current date in miliseconds
  const current = new Date()
  // Convert target week and year in miliseconds
  const target = new Date(targetYear, 0).getTime() + targetWeek * 7 * 24 * 60 * 60 * 1000
  // Get the diff
  const diff = Math.abs(target - current)
  // And finally convert it to week again
  const diffWeeks = Math.round(diff / 1000 / 60 / 60 / 24 / 7)

  // If target is before the current date
  if(current > target) {
    return 'red'
  }
  
  if (diffWeeks <= 1) {
    return 'red';
  } else if (diffWeeks == 2) {
    return 'orange'
  } else if (diffWeeks == 3) {
    return 'yellow'
  }

  return null;
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
          commandDate = data;
        }
        return t.get(cardId, 'shared', 'prod-date');
      })
      .then((data) => {
        if (data !== undefined && data !== '') {
          prodDate = data;
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
            text: 'S' + Number(commandDate.slice(-2)),
            icon: './images/buy.svg',
            color: getWeekBadgeColor(commandDate),
          })
        }

        if (prodDate !== undefined) {
          badges.push({
            text: 'S' + Number(prodDate.slice(-2)),
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