import {Deserializer, Serializer} from 'jsonapi-serializer'
import fp from 'lodash/fp'

const type = 'bets'
const keyForAttribute = (attr) => attr
const typeForAttribute = (attr) => {
  if (attr === type) { return attr }
  if (attr === 'game') { return 'games' }

  return 'teams'
}

const serializeOpts = (isRef = true) => {
  const baseOptions = {
    'attributes': [
      'game',
      'player',
      'teams',
      'surpriseTeam',
      'loserTeam',
      'winner'
    ],
    'player': {
      'attributes': [
        'name'
      ]
    },
    'teams': {
      'ref': '_id'
    },
    'surpriseTeam': {
      'ref': '_id'
    },
    'loserTeam': {
      'ref': '_id'
    },
    'winner': {
      'ref': '_id'
    }
  }

  const rootOptions = {
    'id': '_id',
    keyForAttribute,
    typeForAttribute,
    'game': {
      'ref': true
    }
  }

  const refOptions = {
    'ref': '_id'
  }

  if (isRef) {
    return fp.merge(baseOptions, refOptions)
  }

  return fp.merge(baseOptions, rootOptions)
}

const deserializeOpts = {
  keyForAttribute,
  'games': {
    'valueForRelationship': (game) => game.id
  },
  'teams': {
    'valueForRelationship': (team) => ({'_id': team.id})
  }
}

const betSerializer = new Serializer(type, serializeOpts(false))
const betDeserializer = new Deserializer(deserializeOpts)

export {
  serializeOpts,
  betSerializer as Serializer,
  betDeserializer as Deserializer
}
