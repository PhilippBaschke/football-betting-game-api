import mongoose from 'mongoose'
import {Schema as teamSchema} from '../teams/model'

const Schema = new mongoose.Schema({
  'player': {
    'name': {
      'type': String,
      'required': true
    },
    'email': {
      'type': String,
      'unique': true,
      'required': true
    }
  },
  'teams': {
    'type': [teamSchema],
    'required': true
  },
  'surpriseTeam': {
    'type': teamSchema,
    'required': true
  },
  'loserTeam': {
    'type': teamSchema,
    'required': true
  },
  'winner': {
    'type': teamSchema,
    'required': true
  }
})

const Bet = mongoose.model('Bet', Schema)

export {
  Schema,
  Bet
}

export default Bet
