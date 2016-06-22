import config from 'config'
import footballData from '../../plugins/footballData'
import fp from 'lodash/fp'
import reduce from 'lodash/reduce'

const Schema = {
  'statics': {},
  plugin(fn, options) {
    fn(this, options)
  }
}

Schema.plugin(footballData, config.footballData)

const model = (schema) => {
  const Model = {
    async findOne(query) {
      const apiData = await this.footballData(`/fixtures/${query._id}`)

      return fp.mapKeys((key) => fp.replace('Id', '', key), apiData.fixture)
    }
  }

  const statics = reduce(
    schema.statics,
    (result, value, key) => fp.set(key, value, result),
    {}
  )

  return fp.assign(statics, Model)
}

const Fixture = model(Schema)

export default Fixture
