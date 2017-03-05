console.log(event)

function getDescription(event) {
  var description = '';
  if (event.description) {
    description = event.description.replace(/\n/g, '<br>');
  }
  const facebookLink = 'https://www.facebook.com/' + event.id
  return description + '<br><br><a href="' + facebookLink + '">FACEBOOK LINK</a>';
}

function getDateString(date) {
  if (date) {
    var d = new Date(date);
    return (1+d.getMonth()) + '-' + d.getDate() + '-' + d.getFullYear().toString().substring(2);
  }
}

function getTimeString(date) {
  if (date) {
    var d = new Date(date);
    return d.getUTCHours() + ':' + d.getUTCHours() + ' ' + (d.getUTCHours < 12 ? 'am' : 'pm');
  }
}

function getAddress(event) {
  if (event.place && event.place.location) {
    return event.place.location.street + ' ' +
            event.place.location.city   + ', ' +
            event.place.location.state  + ' ' +
            event.place.location.zip    + ' ' +
            event.place.location.country;
  }
}

function getPlaceName(event) {
  if (event.place) {
    return event.place.name;
  }
}

function getTitle(event) {
  title = '';
  if (event.start_time) {
    var start = new Date(event.start_time);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    title += months[start.getMonth()] + ' ' + start.getDate() + ': '
  }
  title += event.name;
  if (event.place && event.place.location) {
    title += ' - ' + event.place.location.city + ', ' + event.place.location.state;
  }
  return title;
}

var start = event.start_time;
var end = event.end_time ? event.end_time : start; // TODO: allday?

document.querySelector("input[ng-model='textWhen.start.date']").value = getDateString(start);
document.querySelector("div[ng-model='textWhen.start.time']").value = getTimeString(start);
document.querySelector("input[ng-model='textWhen.end.date']").value = getDateString(end);
document.querySelector("div[ng-model='textWhen.end.time']").value = getTimeString(end);
document.querySelector("input[ng-model='event.what.summary']").value = getTitle(event);
document.querySelector("input[ng-model='where.place']").value = getPlaceName(event);
document.querySelector("input[ng-model='where.address']").value = getAddress(event);
document.querySelector("input[ng-model='submitter.name']").value = FIELD_NAME_VALUE
document.querySelector("input[ng-model='submitter.email']").value = FIELD_EMAIL_VALUE
window.frames[0].document.body.innerHTML = getDescription(event);
