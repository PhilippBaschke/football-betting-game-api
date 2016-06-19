import {Serializer} from 'jsonapi-serializer'

const type = 'teams'

const serializeOpts = {
  'id': '_id',
  'attributes': [
    'name',
    'crestUrl'
  ]
}

const teamSerializer = new Serializer(type, serializeOpts)

export {
  teamSerializer as Serializer
}
