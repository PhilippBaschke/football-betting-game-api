import {Deserializer, Serializer} from 'jsonapi-serializer'

const type = 'tournaments'

const serializeOpts = {
  'id': '_id',
  'attributes': [
    'caption',
    'league',
    'year',
    'teams'
  ],
  'teams': {
    'ref': true
  }
}

const deserializeOpts = {}

const tournamentSerializer = new Serializer(type, serializeOpts)
const tournamentDeserializer = new Deserializer(deserializeOpts)

export {
  tournamentSerializer as Serializer,
  tournamentDeserializer as Deserializer
}
