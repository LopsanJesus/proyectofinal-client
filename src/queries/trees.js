import { gql } from "@apollo/client";

export const GET_MY_FOREST = gql`
{
  getMyForest {
    id
    customName
    treeId {
        owner {
            name
            email
        }
        targetLang {
            code
        }
    }
  }
}
`;
