import mongoose from 'mongoose'

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
    'type': [{
      'type': Number,
      'ref': 'Team'
    }],
    'required': true
  },
  'surpriseTeam': {
    'type': Number,
    'ref': 'Team',
    'required': true
  },
  'loserTeam': {
    'type': Number,
    'ref': 'Team',
    'required': true
  },
  'winner': {
    'type': Number,
    'ref': 'Team',
    'required': true
  }
})

export {
  Schema
}
