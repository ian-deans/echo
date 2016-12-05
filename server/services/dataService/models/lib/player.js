import thinky from 'thinky'

const {type, r} = thinky()
const {string, date} = type

export default {
  name: 'Player',
  table: 'players',
  schema: {
    id: string()
      .uuid(4)
      .allowNull(false),

    chapterId: string()
      .uuid(4)
      .allowNull(false),

    createdAt: date()
      .allowNull(false)
      .default(r.now()),

    updatedAt: date()
      .allowNull(false)
      .default(r.now()),
  },
  associate: (Player, models) => {
    Player.belongsTo(models.Chapter, 'chapter', 'chapterId', 'id', {init: false})
  },
}
