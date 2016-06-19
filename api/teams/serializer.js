import fp from 'lodash/fp'
import {Serializer} from 'jsonapi-serializer'

const type = 'teams'

const serializeOpts = (isRef = true) => {
  const baseOptions = {
    'attributes': [
      'name',
      'crestUrl'
    ]
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

const teamSerializer = new Serializer(type, serializeOpts(false))

export {
  serializeOpts,
  teamSerializer as Serializer
}
