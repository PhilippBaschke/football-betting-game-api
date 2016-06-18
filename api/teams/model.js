import mongoose from 'mongoose'

// TODO: Use virtual fields to get the other fields (from the API)
const Schema = new mongoose.Schema({
  '_id': Number
})

export {
  Schema
}
