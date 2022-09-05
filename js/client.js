var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'card-back-section': (t, options) => {
    return {
      title: 'Bellier',
      icon: GRAY_ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 120,
      },
    };
  },
  'card-badges': (t, opts) => {
    let commandDate, prodDate, installDate;
    trello.get('card', 'shared', 'command-date')
      .then((data) => {
        commandDate = Number(data.slice(-2));
        trello.get('card', 'shared', 'prod-date')
      })
      .then((data) => {
        prodDate = Number(data.slice(-2));
        trello.get('card', 'shared', 'install-date')
      })
      .then((data) => {
        installDate = data;
      });

    return t
      .card('name')
      .get('name')
      .then(function (cardName) {
        console.log('We just loaded the card name for fun: ' + cardName);
        return [{
            text: 'Commandes Sem ' + commandDate,
            icon: GRAY_ICON,
            color: null,
          },
          {
            text: 'Prod Sem ' + prodDate,
            icon: GRAY_ICON,
            color: null,
          },
          {
            text: 'Pose ' + installDate,
            icon: GRAY_ICON,
            color: null,
          }
        ];
      });
  },
});