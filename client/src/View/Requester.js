import { encaseP, tryP } from 'fluture'

const parse = res => tryP(_ => res.json())

const future = encaseP(fetch)

/** fetchParsed :: String -> Future Error a */
const fetchParsed = path => future(path).chain(parse)

/** fetchAvailableCities :: () -> Future Error [ {name: String} ] */
export const fetchAvailableCities = () => fetchParsed('/getCities')
