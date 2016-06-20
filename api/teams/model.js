import mongoose from 'mongoose'
import fp from 'lodash/fp'

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

Schema.statics.createFromSoccerSeason =
  async function createFromSoccerSeason(id) {
    const apiData = await this.footballData(`/soccerseasons/${id}/teams`)
    const teamData =
            fp.map((team) => fp.set('_id', team.id, team), apiData.teams)

    return await this.create(teamData)
  }

const Team = mongoose.model('Team', Schema)

export {
  Schema,
  Team
}

export default Team
