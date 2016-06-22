import config from 'config'
import Fixture from '../fixtures/model'
import footballData from '../../plugins/footballData'
import fp from 'lodash/fp'
import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  '_id': Number,
  'caption': {
    'type': String,
    'required': true
  },
  'league': {
    'type': String,
    'required': true
  },
  'year': {
    'type': String,
    'required': true
  },
  'teams': {
    'type': [{
      'type': Number,
      'ref': 'Team'
    }]
  }
})

Schema.pre(
  'validate',

  /**
   * Add data from the football-data.org API
   *
   * @param {function} next The next middleware
   * @this mongoose.Document
   * @return {undefined}
   */
  async function getApiData(next) {
    const apiData =
            await this.constructor.footballData(`/soccerseasons/${this._id}`)

    this.set(apiData)
    next()
  }
)

const addFixtures = async (query, soccerSeason) => {
  const fixtures = await Fixture.findBySoccerSeason(soccerSeason)

  soccerSeason.set('fixtures', fixtures, {'strict': false})

  return soccerSeason
}

Schema.post(
  'find',

  /**
   * Add fixtures to all soccerSeasons
   *
   * @param {Array} soccerSeasons An array of mongoose Documents
   * @param {function} next The next middleware
   * @this mongoose.Query
   * @return {undefined}
   */
  async function addFixturesOnFind(soccerSeasons, next) {
    // Fixtures are not needed when all soccerseasons should be shown
    if (fp.isEmpty(this.getQuery())) { return next() }

    // Promise.all() to make sure that all addFixtures
    // calls are finished before continuing
    // See: https://github.com/tc39/ecmascript-asyncawait/issues/7
    await Promise.all(fp.map(fp.partial(addFixtures, [this]), soccerSeasons))

    return next()
  }
)

Schema.post(
  'findOne',

  /**
   * Add fixtures to the soccerSeason
   * @param {mongoose.Document} soccerSeason A mongoose document
   * @param {function} next The next middleware
   * @this mongoose.Query
   * @return {undefined}
   */
  async function addFixturesOnFindOne(soccerSeason, next) {
    await addFixtures(this, soccerSeason)
    next()
  }
)

Schema.plugin(footballData, config.footballData)

const SoccerSeason = mongoose.model('SoccerSeason', Schema)

export {
  Schema,
  SoccerSeason
}

export default SoccerSeason
