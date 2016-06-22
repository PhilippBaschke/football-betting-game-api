import fp from 'lodash/fp'
import {Serializer} from 'jsonapi-serializer'

const type = 'fixtures'

const serializeOpts = (isRef = true) => {
  const baseOptions = {
    'attributes': [
      'date',
      'status',
      'homeTeam',
      'awayTeam',
      'result'
    ],
    'homeTeam': {
      'ref': 'id'
    },
    'awayTeam': {
      'ref': 'id'
    },
    'typeForAttribute': (attr) => {
      if (fp.endsWith('Team', attr)) { return 'teams' }

      return attr
    }
  }

  const rootOptions = {
    'keyForAttribute': fp.identity
  }

  const refOptions = {
    'ref': 'id'
  }

  if (isRef) {
    return fp.merge(baseOptions, refOptions)
  }

  return fp.merge(baseOptions, rootOptions)
}

const fixturesSerializer = new Serializer(type, serializeOpts(false))

export {
  serializeOpts,
  fixturesSerializer as Serializer
}
