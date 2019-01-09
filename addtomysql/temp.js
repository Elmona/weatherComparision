
const isSummer = date => {
  date = new Date(date)
  const start = new Date(`${date.getUTCFullYear()}-06-21`)
  const end = new Date(`${date.getUTCFullYear()}-09-23`)
  console.log(start)
  return date >= start && date <= end
}

console.log(isSummer('2019-07-06')) // true
console.log(isSummer('2019-01-06')) // false
console.log(isSummer('2012-06-21')) // true
console.log(isSummer('2012-11-22')) // false
console.log(isSummer('1989-12-22')) // false

/*
Städer att välja
------------------
* Jönköping
* Skövde
* Kalmar
* Växjö
* Skellefteå
*/