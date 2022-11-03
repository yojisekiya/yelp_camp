const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose
  .connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR!!!!');
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Databese connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '63552dd93a53a96215cb7355',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae ipsam consequatur ea cumque error quaerat porro, et totam. Libero explicabo earum obcaecati quos dolorum sit sapiente quaerat corporis enim ex.',
      price,
      geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      images: [
        {
          url: 'https://res.cloudinary.com/dqpnahde8/image/upload/v1666795794/Yelp_Camp/a8nvs2zwai8whkxedlsj.png',
          filename: 'Yelp_Camp/a8nvs2zwai8whkxedlsj',
        },
        {
          url: 'https://res.cloudinary.com/dqpnahde8/image/upload/v1666795794/Yelp_Camp/aox7mmvk6ecojt7bfkwx.png',
          filename: 'Yelp_Camp/aox7mmvk6ecojt7bfkwx',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
