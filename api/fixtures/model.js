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

const transformKeys = fp.mapKeys((key) => fp.replace('Id', '', key))
const transformTeams = fp.mapValues.convert({'cap': false})((value, key) => {
  if (key === 'homeTeam' || key === 'awayTeam') { return {'id': value} }

  return value
})
const transform = fp.compose(transformTeams, transformKeys)

const model = (schema) => {
  const Model = {
    async findOne(query) {
      const apiData = await this.footballData(`/fixtures/${query._id}`)

      return await transform(apiData.fixture)
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
