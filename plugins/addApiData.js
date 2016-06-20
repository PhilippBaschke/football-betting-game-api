import _ from 'lodash'

/**
 * Add a pre validate function (that gets API values) to the given schema
 *
 * @param {mongoose.Schema} schema The schema that the plugin is added to
 * @param {Object} options An options object to configure the plugin
 * @returns {undefined}
 */
export default function addApiDataPlugin(schema, options) {
  /**
   * Get related data from the football-data.org API
   *
   * @param {function} next The next middleware
   * @this mongoose.Document
   * @return {undefined}
   */
  const getApiData = async function getApiData(next) {
    const apiData =
            await schema.statics.footballData(`/${options.url}/${this._id}`)

    _.assign(this._doc, apiData)
    next()
  }

  schema.pre('validate', getApiData)
}
