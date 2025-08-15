import moment from 'moment';

const dateFormatOne = moment().format('DD-MM-YYYY');
const dateFormatTwo = moment().format('MMM Do YY');
const dateFormatThree = moment().format('dddd');
console.log(`Today is ${dateFormatOne} or ${dateFormatTwo}, Day of the week: ${dateFormatThree}\n`);