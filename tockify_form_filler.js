console.log(event)

document.querySelector("input[ng-model='event.what.summary']").value = event.name;
document.querySelector("input[ng-model='where.place']").value = event.place.name;
window.frames[0].document.body.innerHTML = event.description.replace(/\n/g, '<br>');

if (event.start_time) {
  var start = new Date(event.start_time)
  var startDate = (1+start.getMonth()) + '-' + start.getDate() + '-' + start.getFullYear().toString().substring(2);
  var startTime = start.getUTCHours() + ':' + start.getUTCHours() + ' ' + (start.getUTCHours < 12 ? 'am' : 'pm')
  document.querySelector("input[ng-model='textWhen.start.date']").value = startDate
  document.querySelector("div[ng-model='textWhen.start.time']").value = startTime;
}

// TODO: allday?
var end = undefined;
if (event.end_time) {
  end = new Date(event.end_time)
} else if (event.start_time) {
  end = new Date(event.start_time)
}

if (end) {
  var endDate = (1+end.getMonth()) + '-' + end.getDate() + '-' + end.getFullYear().toString().substring(2);
  var endTime = end.getUTCHours() + ':' + end.getUTCHours() + ' ' + (end.getUTCHours < 12 ? 'am' : 'pm')
  document.querySelector("input[ng-model='textWhen.end.date']").value = endDate;
  document.querySelector("div[ng-model='textWhen.end.time']").value = endTime;
}

if (event.place && event.place.location) {
  var address = event.place.location.street + ' ' +
                event.place.location.city   + ', ' +
                event.place.location.state  + ' ' +
                event.place.location.zip    + ' ' +
                event.place.location.country;
  document.querySelector("input[ng-model='where.address']").value = address;
}
