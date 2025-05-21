// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const dayjs = require("dayjs");

module.exports = function Dates(){
  let total_date = []
  let today = dayjs();
  let date  = today.add(8,'days').format('dddd, MMMM D')
  let date_3  = today.add(5,'days').format('dddd, MMMM D')
  let date_7  = today.add(3,'days').format('dddd, MMMM D')

  total_date.push(date,date_3,date_7)
  return total_date;
}

