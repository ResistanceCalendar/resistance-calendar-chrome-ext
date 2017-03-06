console.log(event)

function getDescription(event) {
  var description = '';
  if (event.description) {
    description = event.description.replace(/\n/g, '<br>');
  }
  const facebookLink = 'https://www.facebook.com/' + event.id
  return description + '<br><br><a href="' + facebookLink + '">FACEBOOK LINK</a>';
}

function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function getDateString(date) {
  if (date) {
    var d = new Date(date);
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    return padDigits(1 + d.getMonth(), 2) + '-' + padDigits(d.getDate(), 2) + '-' + d.getFullYear().toString().substring(2);
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
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    title += months[start.getMonth()] + ' ' + start.getDate() + ': '
  }
  title += event.name;
  if (event.place && event.place.location) {
    title += ' - ' + event.place.location.city + ', ' + event.place.location.state;
  }
  return title;
}

function setValue(selectorQuery, value) {
  if (value) {
    document.querySelector(selectorQuery).value = value;
    document.querySelector(selectorQuery).dispatchEvent(new Event('change'));
  }
}

var start = event.start_time;
var end = event.end_time ? event.end_time : start; // TODO: allday?

setValue("input[ng-model='textWhen.start.date']", getDateString(start));
setValue("div[ng-model='textWhen.start.time']", getTimeString(start));
setValue("input[ng-model='textWhen.end.date']", getDateString(end));
setValue("div[ng-model='textWhen.end.time']", getTimeString(end));
setValue("input[ng-model='event.what.summary']", getTitle(event));
setValue("input[ng-model='where.place']", getPlaceName(event));
setValue("input[ng-model='where.address']", getAddress(event));
setValue("input[ng-model='submitter.name']", FIELD_NAME_VALUE)
setValue("input[ng-model='submitter.email']", FIELD_EMAIL_VALUE);
window.frames[0].document.body.innerHTML = getDescription(event);
window.frames[0].document.dispatchEvent(new Event('change'));
window.frames[0].document.body.dispatchEvent(new Event('change'));
