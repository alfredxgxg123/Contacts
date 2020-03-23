/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const { find } = require('../database/index.js');

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running, listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/properties', (req, res) => {
  find({}, (data) => {
    res.send(data);
  });
});

app.get('/date', (req, res) => {
  const arrayOfDays = () => {
    const justDate = (day) => day.toString().slice(0, 10);
    const today = new Date();
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const days = [yesterday, today, tomorrow];
    const abbrDays = days.map((day) => justDate(day));
    const abbrDaysArr = abbrDays.map((abbrDay) => abbrDay.split(' '));
    const abbrDaysObj = abbrDaysArr.map((abbrDate) => {
      return {
        day: abbrDate[0],
        month: abbrDate[1],
        date: abbrDate[2],
      };
    });
    return abbrDaysObj;
  };
  res.send(arrayOfDays());
});
