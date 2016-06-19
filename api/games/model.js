import {Schema as betSchema} from '../bets/model'
import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  '_id': {
    'type': String
  },
  'name': {
    'type': String,
    'required': true
  },
  'soccerseason': {
    'type': Number,
    'ref': 'SoccerSeason',
    'required': true
  },
  'points': {
    'win': {
      'type': Number,
      'required': true
    },
    'draw': {
      'type': Number,
      'required': true
    },
    'last16': {
      'type': Number,
      'required': true
    },
    'advance': {
      'type': Number,
      'required': true
    },
    'surpriseFactor': {
      'type': Number,
      'required': true
    },
    'loserWin': {
      'type': Number,
      'required': true
    },
    'loserDraw': {
      'type': Number,
      'required': true
    },
    'winner': {
      'type': Number,
      'required': true
    }
  },
  'bets': [betSchema]
})

const Game = mongoose.model('Game', Schema)

export {
  Schema,
  Game
}

export default Game
