import {GraphQLNonNull} from 'graphql'
import {GraphQLList} from 'graphql/type'

import {CreatedIdList, SurveyResponseInput} from 'src/server/graphql/schemas'
import {resolveSaveRetrospectiveSurveyResponses} from 'src/server/graphql/resolvers'

export default {
  type: CreatedIdList,
  args: {
    responses: {
      description: 'The response to save',
      type: new GraphQLNonNull(new GraphQLList(SurveyResponseInput))
    }
  },
  resolve: resolveSaveRetrospectiveSurveyResponses,
}
