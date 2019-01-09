import { encaseP2, tryP } from 'fluture'

const parse = res => tryP(_ => res.json())

const future = encaseP2(fetch)

/** fetchParsed :: String -> Future Error a */
const fetchParsed = path => future(path, null).chain(parse)

/** fetchParsed :: String -> Future Error a */
const postParsed = path => data =>
  future(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).chain(parse)

/** fetchAvailableCities :: () -> Future Error [ {name: String} ] */
export const fetchAvailableCities = () => fetchParsed('/getAvailableCities')

/** getSummaryForCities :: {cities: [String], startDate: String, endDate: String} -> [WeatherData] */
export const getSummaryForCities = postParsed('/summariesCities')
