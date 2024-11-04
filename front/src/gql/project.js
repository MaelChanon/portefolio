import gql from 'graphql-tag';

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: Int!, $data: UpdateProjectInput) {
    updateProject(id: $id, data: $data) {
      id
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($data: UpdateProjectInput) {
    createProject(data: $data) {
      id
    }
  }
`;
