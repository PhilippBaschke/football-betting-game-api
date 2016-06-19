import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  '_id': Number,
  'name': {
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
