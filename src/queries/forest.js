import { gql } from "@apollo/client";

export const GET_MY_FOREST = gql`
{
  getMyForest {
    id
    customName
    treeId {
        id
        owner {
            name
            email
        }
        sourceLang {
          code
        }
        targetLang {
            code
        }
        branches {
          id
          name
          numberOfApples
          numberOfLeaves
        }
    }
  }
}
`;

export const GET_ALL_TREES = gql`
{
  getAllTrees {
    id
    name
    owner {
      id
      name
      email
    }
    sourceLang {
      code
    }
    targetLang {
      code
    }
    branches {
      id
      name
      numberOfApples
      numberOfLeaves
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

export const GET_TREE = gql`
query getTreeQuery($id: Int!){
  getTree (id: $id){
    name
    owner {
      id
      name
      email
    }
    sourceLang {
      code
      name
    }
    targetLang {
      code
      name
    }
    branches {
      id
      name
      numberOfApples
      numberOfLeaves
    }
    importedBy {
      id
      customName
      userId {
        id
      }
    }
  }
}
`;

export const IMPORT_TREE = gql`
  mutation importTreeMutation($id: Int!) {
    importTree(id: $id) {
      customName
    }
  }
`;

export const CREATE_TREE = gql`
mutation createTreeMutation($name: String!, $sourceLang: Int!, $targetLang: Int!) {
  createTree(name: $name, sourceLang: $sourceLang, targetLang: $targetLang) {
    id
    name
  }
}
`;