import {Deserializer, Serializer} from 'jsonapi-serializer'
import fp from 'lodash/fp'
import {serializeOpts as teamsSerializeOpts} from '../teams/serializer'

const type = 'soccerseasons'

const serializeOpts = (isRef = true) => {
  const baseOptions = {
    'attributes': [
      'caption',
      'league',
      'year',
      'teams'
    ],
    'teams': teamsSerializeOpts()
  }

  const rootOptions = {
    'id': '_id',
    'keyForAttribute': fp.identity
  }

  const refOptions = {
    'ref': '_id'
  }

  if (isRef) {
    return fp.merge(baseOptions, refOptions)
  }

  return fp.merge(baseOptions, rootOptions)
}

const deserializeOpts = {}

const soccerSeasonsSerializer = new Serializer(type, serializeOpts(false))
const soccerSeasonsDeserializer = new Deserializer(deserializeOpts)

export {
  serializeOpts,
  soccerSeasonsSerializer as Serializer,
  soccerSeasonsDeserializer as Deserializer
}
