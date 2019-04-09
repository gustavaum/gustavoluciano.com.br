// request.open('GET', 'http://behance.net/v2/users/gustavaum/projects?api_key=wJFMR2YuqitIEXKmRYdg1hyt66lNotfE', true);


var request = new XMLHttpRequest();

request.open('GET', 'http://behance.net/v2/users/gustavaum/projects?api_key=wJFMR2YuqitIEXKmRYdg1hyt66lNotfE', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    
    data.forEach(projects => {
      console.log(projects);
    });

  } else {
    console.log('error');
  }
}

request.send();