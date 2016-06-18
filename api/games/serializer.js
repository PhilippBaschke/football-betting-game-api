import {Deserializer, Serializer} from 'jsonapi-serializer'

const serialize = {
  'type': 'games',
  'opts': {
    'id': '_id',
    'attributes': [
      'name',
      'tournament',
      'points',
      'bets'
    ],
    'keyForAttribute': 'camelCase',
    'typeForAttribute': (attr) => {
      if (attr === serialize.type) { return attr }
      if (attr === 'tournament') { return 'tournaments' }
      if (attr === 'bets') { return 'bets' }

      return 'teams'
    },
    'tournament': {
      'ref': true
    },
    'bets': {
      'ref': '_id',
      'attributes': [
        'game',
        'player',
        'teams',
        'winner',
        'loserTeam',
        'surpriseTeam'
      ],
      'player': {
        'attributes': [
          'name'
        ]
      },
      'teams': {
        'ref': '_id'
      },
      'winner': {
        'ref': '_id'
      },
      'surpriseTeam': {
        'ref': '_id'
      },
      'loserTeam': {
        'ref': '_id'
      }
    }
  }
}

const deserialize = {
  'keyForAttribute': 'camelCase',
  'tournaments': {
    'valueForRelationship': (tournament) => tournament.id
  }
}

const gameSerializer = new Serializer(serialize.type, serialize.opts)
const gameDeserializer = new Deserializer(deserialize)

export {
  gameSerializer as Serializer,
  gameDeserializer as Deserializer
}
