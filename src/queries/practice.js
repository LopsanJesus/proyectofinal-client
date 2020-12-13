import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
query getQuestionsQuery($id: Int!){
  getTree (id: $id){
    name
    branches {
      leaves {
        id
        name
        translation
      }
    }
    importedBy {
      id
      userId {
        id
      }
    }
  }
}
`;

export const RECORD_TEST = gql`
  mutation recordTestMutation($score: Int!, $numberOfLeaves: Int!, $names: [String!]!, $hits: [String!]!, $importedTreeId: Int!) {
    recordTest(score: $score, numberOfLeaves: $numberOfLeaves, names: $names, hits: $hits, importedTreeId: $importedTreeId )
  }
`;

export const GET_MY_HISTORY = gql`
  {
    getMyHistory {
      score
      numberOfLeaves
      createdAt
      importedTree {
        treeId {
          name
        }
      }
    }
  }
`;