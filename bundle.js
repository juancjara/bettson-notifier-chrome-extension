console.log('loaded');
var url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP?unique=2_33_1&segmentID=613&languageCode=pe';

function httpRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      cb(xhr.responseText);
    }
  }
  xhr.send();
}

function parseOngoingEvents(data) {
  var ongoingEvents = parseData.FetchLiveEventsMatchWinnerJSONPResult.OngoingEvents;

}

$('#btn').on('click', function() {
  httpRequest(url, function(data) {
    var parseData = JSON.parse(data);
    parseOngoingEvents(data);
  });
})

