const STAIR_ICON = 'https://raw.githubusercontent.com/Bellier-Oeba/Trello-Bellier/gh-pages/images/stairs.svg';
const COMMAND_ICON = 'https://raw.githubusercontent.com/Bellier-Oeba/Trello-Bellier/gh-pages/images/buy.svg';
const PROD_ICON = 'https://raw.githubusercontent.com/Bellier-Oeba/Trello-Bellier/gh-pages/images/build.svg';
const INSTALL_ICON = 'https://raw.githubusercontent.com/Bellier-Oeba/Trello-Bellier/gh-pages/images/home-build.svg';

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => {
    return {
      title: 'Bellier',
      icon: STAIR_ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 120,
      },
    };
  },
  'card-badges': (t, opts) => {
    let commandDate, prodDate, installDate;
    return t.get('card', 'shared', 'command-date')
      .then((data) => {
        commandDate = Number(data.slice(-2));
        t.get('card', 'shared', 'prod-date')
      })
      .then((data) => {
        prodDate = Number(data.slice(-2));
        t.get('card', 'shared', 'install-date')
      })
      .then((data) => {
        installDate = data;

        // Now, build badges list
        const badges = [];

        if (commandDate !== undefined) {
          badges.push({
            text: commandDate,
            icon: COMMAND_ICON,
            color: null,
          })
        }

        if (prodDate !== undefined) {
          badges.push({
            text: prodDate,
            icon: PROD_ICON,
            color: null,
          })
        }

        if (installDate !== undefined) {
          badges.push({
            text: installDate,
            icon: INSTALL_ICON,
            color: null,
          })
        }

        return badges;
      });
  },
});