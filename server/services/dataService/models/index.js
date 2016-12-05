import config from 'src/config'
import autoloader from 'auto-loader'
import thinky from 'thinky'

const {r} = thinky()

const lib = autoloader.load(`${__dirname}/lib`)
const modelConfigurations = Object.values(lib).reduce((result, modelConfig) => {
  if (modelConfig && modelConfig.schema) {
    result[modelConfig.name] = modelConfig
  }
  return result
}, {})

export default function loadModels(thinky) {
  const models = {}

  // initiate models
  Object.values(modelConfigurations).forEach(modelConfig => {
    const {name, table, schema, pk} = modelConfig
    const options = {
      pk: pk || 'id',
      table: config.server.rethinkdb.tableCreation,
      enforce_extra: 'remove', // eslint-disable-line camelcase
    }
    models[name] = thinky.createModel(table, schema, options)
    models[name].docOn('saving', function () {
      this.updatedAt = r.now() // set updatedAt on every save
    })
  })

  // set model associations
  Object.values(modelConfigurations).forEach(modelConfig => {
    if (typeof modelConfig.associate === 'function') {
      const {name, associate} = modelConfig
      associate(models[name], models)
    }
  })

  return models
}
