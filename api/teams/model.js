import mongoose from 'mongoose'

// TODO: Use virtual fields to get the other fields (from the API)
const Schema = new mongoose.Schema({
  '_id': Number,
  'name': {
    'type': String,
    'required': true
  },
  'crestUrl': {
    'type': String,
    'required': true
  }
})

const Team = mongoose.model('Team', Schema)

export {
  Schema,
  Team
}

export default Team
