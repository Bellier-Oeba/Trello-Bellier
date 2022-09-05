var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'card-back-section': function (t, options) {
    return {
      title: 'Bellier',
      icon: GRAY_ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 150,
      },
    };
  }
});