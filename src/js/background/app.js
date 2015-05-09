import httpRequest from './httpRequest';
import chromeNotification from './chromeNotification';
import db from './db';

const url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/' +
  'PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP' +
  '?unique=2_33_1&segmentID=613&languageCode=pe';


function parseData(data) {
  let liveEvents = data.FetchLiveEventsMatchWinnerJSONPResult
                    .OngoingEvents;
  let niceData = liveEvents.map(ev => {
    return {
      name: ev.name,
      events: ev.events.map(game => {
        let gameResults = 'Not yet';
        if (game.GameResults) {
          gameResults = game.GameResults[0].GameResultValue +
                         '-' + game.GameResults[1].GameResultValue;
        }
        let teamsOdds = [{team: 'no', odds: 'hay'}];
        if (game.MarketGroups) {
          teamsOdds = game.MarketGroups[0].Markets[0]
                        .MarketSelections.map(item => { 
                          return {
                            team: item.MarketSelectionName,
                            odds: item.Odds
                          }
                        });
        }
        return {
          id: game.EventId,
          categoryName: game.CategoryName,
          name: game.EventName,
          periodName: game.EventPeriodName,
          subCategoryName: game.SubCategoryName,
          gameResults,
          teamsOdds
        }
      })
    }
  });
  db.updateGames(niceData, () => {
    console.log('saved');
  });
}

httpRequest.send(url, (response) => {
  parseData(JSON.parse(response));
});