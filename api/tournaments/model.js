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
    'type': [Number],
    'ref': 'Team'
  }
})

const Tournament = mongoose.model('Tournament', Schema)

export {
  Schema,
  Tournament
}

export default Tournament
