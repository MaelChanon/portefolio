import gql from 'graphql-tag';

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: Int!, $data: UpdateProjectInput) {
    updateProject(id: $id, data: $data) {
      id
    }
  }
`;
