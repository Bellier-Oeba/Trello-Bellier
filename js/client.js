var Promise = TrelloPowerUp.Promise;

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'attachment-sections': function (t, options) {
    // we will just claim urls for Yellowstone
    var claimed = options.entries.filter(function (attachment) {
      return attachment.url.indexOf('http://www.nps.gov/yell/') === 0;
    });

    if (claimed && claimed.length > 0) {
      return [{
        id: 'Yellowstone', // optional if you aren't using a function for the title
        claimed: claimed,
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
        title: 'Example Attachment Section: Yellowstone',
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html', {
            arg: 'you can pass your section args here'
          }),
          height: 230
        }
      }];
    } else {
      return [];
    }
  }
});