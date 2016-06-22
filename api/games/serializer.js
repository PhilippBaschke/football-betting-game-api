import {Deserializer, Serializer} from 'jsonapi-serializer'
import {serializeOpts as betsSerializeOpts} from '../bets/serializer'
import fp from 'lodash/fp'
import {serializeOpts as soccerSeasonsSerializeOpts}
from '../soccerseasons/serializer'

const serialize = {
  'type': 'games',
  'opts': {
    'id': '_id',
    'attributes': [
      'name',
      'soccerseason',
      'points',
      'bets'
    ],
    'keyForAttribute': 'camelCase',
    'typeForAttribute': (attr) => {
      if (fp.includes('team', fp.lowerCase(attr))) { return 'teams' }

      return attr
    },
    'soccerseason': soccerSeasonsSerializeOpts(),
    'bets': betsSerializeOpts()
  }
}

const deserialize = {
  'keyForAttribute': 'camelCase',
  'soccerseasons': {
    'valueForRelationship': (soccerseason) => soccerseason.id
  }
}

const gameSerializer = new Serializer(serialize.type, serialize.opts)
const gameDeserializer = new Deserializer(deserialize)

export {
  gameSerializer as Serializer,
  gameDeserializer as Deserializer
}
