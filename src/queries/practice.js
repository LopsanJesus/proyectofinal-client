import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
query getQuestionsQuery($id: Int!){
  getTree (id: $id){
    branches {
      leaves {
        id
        name
        translation
      }
    }
    importedBy {
      userId {
        id
      }
    }
  }
}
`;

export const RECORD_TEST = gql`
  mutation recordTestMutation($id: Int!) {
    importTree(id: $id) {
      customName
    }
  }
`;