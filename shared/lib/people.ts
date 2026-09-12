// Demo-data access for people.json. Lives in the demo/lib layer so ui
// primitives (Avatar) stay data-free — call sites pass resolved objects via
// the `person` prop instead. The json→Person assertion lives here, once;
// consumers import the typed `people` array instead of re-casting the json.
import peopleData from '../data/people.json'

// Fields components actually read, typed against the people.json schema;
// everything else stays reachable through the index signature.
export interface Person {
  /** mixed in the seed data — some entries use numeric ids */
  id?: string | number
  full_name?: string
  first_name?: string
  last_name?: string
  email?: string
  photo?: string
  company?: string
  job_title?: string
  city?: string
  country?: string
  country_code?: string
  birth_date?: string
  time_zone?: string
  university?: string
  [key: string]: unknown
}

export const people = peopleData as Person[]

export function personById(id: number): Person | undefined {
  return people[id - 1]
}
