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

export default mongoose.model('Game', gameSchema)
