import {Deserializer, Serializer} from 'jsonapi-serializer'

const keyForAttribute = (attr) => attr

const serialize = {
  'type': 'bets',
  'opts': {
    'id': '_id',
    'attributes': [
      'game',
      'player',
      'teams',
      'surpriseTeam',
      'loserTeam',
      'winner'
    ],
    keyForAttribute,
    'typeForAttribute': (attr) => {
      if (attr === serialize.type) { return attr }
      if (attr === 'game') { return 'games' }

      return 'teams'
    },
    'player': {
      'attributes': [
        'name'
      ]
    },
    'game': {
      'ref': true
    },
    'teams': {
      'ref': true
    },
    'surpriseTeam': {
      'ref': true
    },
    'loserTeam': {
      'ref': true
    },
    'winner': {
      'ref': true
    }
  }
}

const deserialize = {
  keyForAttribute,
  'games': {
    'valueForRelationship': (game) => game.id
  },
  'teams': {
    'valueForRelationship': (team) => ({'_id': team.id})
  }
}

const betSerializer = new Serializer(serialize.type, serialize.opts)
const betDeserializer = new Deserializer(deserialize)

export {
  betSerializer as Serializer,
  betDeserializer as Deserializer
}
