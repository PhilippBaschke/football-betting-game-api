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
    'valueForRelationship': (team) => ({'_id': team.id})
  }
}

export {
  Schema,
  Bet,
  serialize,
  deserialize
}

export default Bet
