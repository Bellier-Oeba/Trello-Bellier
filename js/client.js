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
    let commandDate, prodDate, installDate;
    return t.get('command-date')
      .then((data) => {
        commandDate = Number(data.slice(-2));
        t.get('prod-date')
      })
      .then((data) => {
        prodDate = Number(data.slice(-2));
        t.get('install-date')
      })
      .then((data) => {
        installDate = data;

        // Now, build badges list
        const badges = [];

        if (commandDate !== undefined) {
          badges.push({
            text: commandDate,
            icon: './images/buy.svg',
            color: null,
          })
        }

        if (prodDate !== undefined) {
          badges.push({
            text: prodDate,
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
      });
  },
});