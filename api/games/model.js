import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
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
  }
})

const Game = mongoose.model('Game', gameSchema)

const serialize = {
  'type': 'games',
  'opts': {
    'attributes': [
      'name',
      'tournament',
      'points'
    ],
    'tournament': {
      'ref': true
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
  Game,
  serialize,
  deserialize
}

export default Game
