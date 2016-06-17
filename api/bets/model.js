import mongoose from 'mongoose'

const betSchema = new mongoose.Schema({
  'game': {
    'type': String,
    'ref': 'Game',
    'required': true
  },
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
    'type': [Number],
    'required': true
  },
  'surpriseTeam': {
    'type': Number,
    'required': true
  },
  'loserTeam': {
    'type': Number,
    'required': true
  },
  'winner': {
    'type': Number,
    'required': true
  }
})

const Bet = mongoose.model('Bet', betSchema)

const keyForAttribute = (attr) => attr

const serialize = {
  'type': 'bets',
  'opts': {
    'id': '_id',
    'attributes': [
      'game',
      'player',
      'teams',
      'surpriseTeam',
      'loserTeam',
      'winner'
    ],
    keyForAttribute,
    'typeForAttribute': (attr) => {
      if (attr === serialize.type) { return attr }
      if (attr === 'game') { return 'games' }

      return 'teams'
    },
    'player': {
      'attributes': [
        'name'
      ]
    },
    'game': {
      'ref': true
    },
    'teams': {
      'ref': true
    },
    'surpriseTeam': {
      'ref': true
    },
    'loserTeam': {
      'ref': true
    },
    'winner': {
      'ref': true
    }
  }
}

const deserialize = {
  keyForAttribute,
  'games': {
    'valueForRelationship': (game) => game.id
  },
  'teams': {
    'valueForRelationship': (team) => team.id
  }
}

export {
  Bet,
  serialize,
  deserialize
}

export default Bet
