const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');
var axios = require('axios');
const {
  actionssdk,
  SimpleResponse,
  BasicCard,
  Button,
  Image,
  BrowseCarousel,
  BrowseCarouselItem,
  Suggestions,
  LinkOutSuggestion,
  MediaObject,
  Table,
  List,
  Carousel,
} = require('actions-on-google');

const app = conversation();


app.handle('get_top_5', conv => {
  // Implement your code here
  var axios = require('axios');
  var cities = [];
  var config = {
    method: 'get',
    url: 'https://sage.pg.com/bot/get_top_5',
    headers: { }
  };

 return axios(config)
.then(function (response) {
 conv.add( response.data.forEach(element => {
    console.log(element);
    }));
  })
  .catch(function (error) {
    console.log(error);
  });
    //conv.add("Looking for results...");
  });

app.handle('get_bottom_5', conv => {
  // Implement your code here
  var config = {
    method: 'get',
    url: 'https://run.mocky.io/v3/a099f739-6a74-449e-af43-3f50cd10d5b3',
    headers: { }
  };

 return axios(config)
  .then(function (response) {
    conv.add(response.data.stores.join(", "));
  })
  .catch(function (error) {
    console.log(error);
  });
    //conv.add("Looking for results...");
  });


app.handle('mumbaiwebhook', conv => {
  conv.add(new BasicCard({
    text: 'This is a text',
    title: 'Title: this is a title',
    subtitle: 'This is a subtitle',
    image: new Image({
      url: 'https://storage.googleapis.com/actionsresources/logo_assistant_2x_64dp.png',
      alt: 'Image BB',
    }),
    buttons: new Button({
      title: 'This is a button',
      url: 'https://assistant.google.com/',
    }),
    display: 'DEFAULT',
  }));
});

app.handle('get_top_5_api', conv => {
  // Implement your code here
  var config = {
  method: 'get',
  url: 'https://dev-stage-6.herokuapp.com/citysales/topfive',
  headers: { }
	};

 return axios(config).then(function (response) {
  let temp=[];
  response.data.payload.citySales.forEach(element => {
    let obj = {};
    obj.city = element.city,
    obj.sales = element.sales,
    temp.push(obj.city);
  });
     conv.add(temp.join("\n"));
  })
  .catch(function (error) {
    console.log(error);
  });
    //conv.add("Looking for results...");
  });
app.handle('get_bottom_5_api', conv => {
  // Implement your code here
  var config = {
  method: 'get',
  url: 'https://dev-stage-6.herokuapp.com/citysales/bottomfive',
  headers: { }
	};

 return axios(config).then(function (response) {
  let temp=[];
  response.data.payload.citySales.forEach(element => {
    let obj = {};
    obj.city = element.city,
    obj.sales = element.sales,
    temp.push(obj.city);
  });
     conv.add(temp.join("\n"));
  })
  .catch(function (error) {
    console.log(error);
  });
    //conv.add("Looking for results...");
  });

app.handle('mumbai_api', conv => {
  // Implement your code here
 var config = {
  method: 'get',
  url: 'https://dev-stage-6.herokuapp.com/citysales/cityname?city_sales=mumbai',
  headers: { }
	};

  return axios(config)
    .then(function (response) {
      let temp = response.data.payload.citySales;
      conv.add(temp.city, temp.sales);
    })
    .catch(function (error) {
      console.log(error);
    });    //conv.add("Looking for results...");
    });




exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
