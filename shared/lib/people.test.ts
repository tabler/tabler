import { describe, expect, it } from 'vitest'
import { personById } from './people'

describe('personById', () => {
  it('resolves a 1-based id to the people.json entry', () => {
    const person = personById(1)
    expect(person).toBeDefined()
    expect(typeof person?.full_name).toBe('string')
    expect(person?.full_name?.length).toBeGreaterThan(0)
  })

  it('returns undefined for out-of-range ids', () => {
    expect(personById(0)).toBeUndefined()
    expect(personById(9999)).toBeUndefined()
  })
})
