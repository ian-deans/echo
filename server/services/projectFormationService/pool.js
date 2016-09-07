export function getTeamSizeForGoal(pool, goalDescriptor) {
  return pool.goals.find(
    goal => goal.goalDescriptor === goalDescriptor
  ).teamSize
}

export function getGoalsWithVotesSortedByPopularity(pool) {
  return unique(
    flatten(pool.votes.map(vote => vote.votes))
  )
}

export function voteCountsByGoal(pool) {
  const result = new Map(pool.goals.map(({goalDescriptor}) => [goalDescriptor, [0, 0]]))
  for (const {votes} of pool.votes) {
    votes.forEach((goalDescriptor, i) => {
      result.get(goalDescriptor)[i]++
    })
  }
  return result
}

export function getNonAdvancedPlayerCount(pool) {
  return getPoolSize(pool) - getAdvancedPlayerCount(pool)
}

export function getAdvancedPlayerCount(pool) {
  return getAdvancedPlayerInfo(pool).length
}

export function isAdvancedPlayerId(pool, playerId) {
  return getAdvancedPlayerIds(pool).includes(playerId)
}

export function getPoolSize(pool) {
  return getPlayerIds(pool).length
}

export function getPlayerIds(pool) {
  return pool.votes.map(vote => vote.playerId)
}

export function getNonAdvancedPlayerIds(pool) {
  return getPlayerIds(pool).filter(id => !isAdvancedPlayerId(pool, id))
}

export function getAdvancedPlayerInfo(pool) {
  return pool.advancedPlayers
}

export function getAdvancedPlayerIds(pool) {
  return pool.advancedPlayers.map(_ => _.id)
}

export function getVotesByPlayerId(pool) {
  return pool.votes.reduce((result, vote) => ({
    [vote.playerId]: vote.votes, ...result
  }), {})
}

export function getTeamSizesByGoal(pool) {
  return pool.goals.reduce((result, goal) => {
    return {[goal.goalDescriptor]: goal.teamSize, ...result}
  }, {})
}

function flatten(array) {
  return array.reduce((result, item) => {
    if (Array.isArray(item)) {
      item = flatten(item)
    }
    return result.concat(item)
  }, [])
}

function unique(array) {
  return Array.from(new Set(array))
}