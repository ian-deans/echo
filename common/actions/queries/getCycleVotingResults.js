export default function getCycleVotingResults() {
  return {
    query: `
      query {
        getCycleVotingResults {
          id
          cycle {
            id
            cycleNumber
            startTimestamp
            state
            chapter {
              id
              name
              channelName
              timezone
              goalRepositoryURL
              githubTeamId
            }
          }
          pools {
            id
            name
            level
            voterPlayerIds
            users {
              id
            }
            votingIsStillOpen
            candidateGoals {
              goal {
                number
                url
                title
              }
              playerGoalRanks {
                playerId
                goalRank
              }
            }
          }
        }
      }
    `,
  }
}
