// Demo-data helper: resolves a 1-based person id to the people.json entry.
// Lives in the demo/lib layer so ui primitives (Avatar) stay data-free —
// call sites pass the resolved object via the `person` prop instead.
import people from '../data/people.json'

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

export function personById(id: number): Person | undefined {
  return (people as Person[])[id - 1]
}
