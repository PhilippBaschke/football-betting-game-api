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

const SoccerSeason = mongoose.model('SoccerSeason', Schema)

export {
  Schema,
  SoccerSeason
}

export default SoccerSeason
