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

const SoccerSeason = mongoose.model('SoccerSeason', Schema)

export {
  Schema,
  SoccerSeason
}

export default SoccerSeason
