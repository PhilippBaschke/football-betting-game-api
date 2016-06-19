import {Deserializer, Serializer} from 'jsonapi-serializer'

const type = 'soccerseasons'

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

const soccerSeasonsSerializer = new Serializer(type, serializeOpts)
const soccerSeasonsDeserializer = new Deserializer(deserializeOpts)

export {
  soccerSeasonsSerializer as Serializer,
  soccerSeasonsDeserializer as Deserializer
}
