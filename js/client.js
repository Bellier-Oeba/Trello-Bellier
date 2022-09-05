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
        if (data !== undefined) {
          commandDate = Number(data.slice(-2));
        }
        return t.get(cardId, 'shared', 'prod-date');
      })
      .then((data) => {
        if (data !== undefined) {
          prodDate = Number(data.slice(-2));
        }
        return t.get(cardId, 'shared', 'install-date');
      })
      .then((data) => {
        if (data !== undefined) {
          installDate = data;
        }

        // Now, build badges list
        const badges = [];

        if (commandDate !== undefined) {
          badges.push({
            text: 'Sem ' + commandDate,
            icon: './images/buy.svg',
            color: null,
          })
        }

        if (prodDate !== undefined) {
          badges.push({
            text: 'Sem ' + prodDate,
            icon: './images/build.svg',
            color: null,
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
          callback: (t, opts) => {
            const cards = [];

            opts.cards.forEach(c => {
              t.get(c.id, 'shared', 'prod-date')
                .then((data) => {
                  cards.push({
                    id: c.id,
                    date: Number(data.slice(-2))
                  })
                })
            });

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