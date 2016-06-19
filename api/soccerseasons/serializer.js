import {Deserializer, Serializer} from 'jsonapi-serializer'
import fp from 'lodash/fp'
import {serializeOpts as teamsSerializeOpts} from '../teams/serializer'

const type = 'soccerseasons'
const concatArrays = (objValue, srcValue) => {
  if (fp.isArray(objValue)) { return objValue.concat(srcValue) }

  return srcValue
}

const serializeOpts = (isRef = true) => {
  const baseOptions = {
    'attributes': [
      'caption',
      'league',
      'year'
    ]
  }

  const rootOptions = {
    'id': '_id',
    'attributes': [
      'teams'
    ],
    'teams': teamsSerializeOpts(),
    'keyForAttribute': fp.identity
  }

  const refOptions = {
    'ref': '_id'
  }

  if (isRef) {
    return fp.merge(baseOptions, refOptions)
  }

  return fp.mergeWith(concatArrays, baseOptions, rootOptions)
}

const deserializeOpts = {}

const soccerSeasonsSerializer = new Serializer(type, serializeOpts(false))
const soccerSeasonsDeserializer = new Deserializer(deserializeOpts)

export {
  serializeOpts,
  soccerSeasonsSerializer as Serializer,
  soccerSeasonsDeserializer as Deserializer
}
