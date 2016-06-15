import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  'title': {
    'type': String,
    'unique': true,
    'required': true
  },
  'name': {
    'type': String,
    'required': true
  },
  'cup': {
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
    'id': 'title',
    'attributes': [
      'title',
      'name',
      'cup',
      'points'
    ],
    'cup': {
      'ref': true
    }
  }
}

const deserialize = {
  'keyForAttribute': 'camelCase',
  'cups': {
    'valueForRelationship': (cup) => cup.id
  }
}

export {
  Game,
  serialize,
  deserialize
}

export default Game
