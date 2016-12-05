import thinky from 'thinky'

const {type, r} = thinky()
const {string, date, array, boolean} = type

export default {
  name: 'Vote',
  table: 'votes',
  schema: {
    id: string()
      .uuid(4)
      .allowNull(false),

    poolId: string()
      .uuid(4)
      .allowNull(false),

    playerId: string()
      .uuid(4)
      .allowNull(false),

    goals: array()
      .allowNull(false),

    pendingValidation: boolean()
      .allowNull(false),

    notYetValidatedGoalDescriptors: array()
      .allowNull(true)
      .default(null),

    createdAt: date()
      .allowNull(false)
      .default(r.now()),

    updatedAt: date()
      .allowNull(false)
      .default(r.now()),
  },
  associate: (Vote, models) => {
    Vote.belongsTo(models.Pool, 'pool', 'poolId', 'id', {init: false})
    Vote.belongsTo(models.Player, 'player', 'playerId', 'id', {init: false})
  },
}
