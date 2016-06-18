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
  'tournament': {
    'type': Number,
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


const serialize = {
  'type': 'games',
  'opts': {
    'id': '_id',
    'attributes': [
      'name',
      'tournament',
      'points',
      'bets'
    ],
    'keyForAttribute': 'camelCase',
    'typeForAttribute': (attr) => {
      if (attr === serialize.type) { return attr }
      if (attr === 'tournament') { return 'tournaments' }
      if (attr === 'bets') { return 'bets' }

      return 'teams'
    },
    'tournament': {
      'ref': true
    },
    'bets': {
      'ref': '_id',
      'attributes': [
        'game',
        'player',
        'teams',
        'winner',
        'loserTeam',
        'surpriseTeam'
      ],
      'player': {
        'attributes': [
          'name'
        ]
      },
      'teams': {
        'ref': '_id'
      },
      'winner': {
        'ref': '_id'
      },
      'surpriseTeam': {
        'ref': '_id'
      },
      'loserTeam': {
        'ref': '_id'
      }
    }
  }
}

const deserialize = {
  'keyForAttribute': 'camelCase',
  'tournaments': {
    'valueForRelationship': (tournament) => tournament.id
  }
}

export {
  Schema,
  Game,
  serialize,
  deserialize
}

export default Game
