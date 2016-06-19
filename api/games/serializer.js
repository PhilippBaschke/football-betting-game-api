import {Deserializer, Serializer} from 'jsonapi-serializer'
import {serializeOpts as betsSerializeOpts} from '../bets/serializer'
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
      if (attr === serialize.type) { return attr }
      if (attr === 'soccerseason') { return 'soccerseasons' }
      if (attr === 'bets') { return 'bets' }

      return 'teams'
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
