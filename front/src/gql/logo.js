import gql from 'graphql-tag';

export const GET_LOGOS = gql`
  query logos {
    logos {
      id
      photo
      color
      link
      alt
    }
  }
`;

export const UPDATE_LOGO = gql`
  mutation updateLogo($id: Int, $data: UpdateLogoInput) {
    updateLogo(id: $id, data: $data) {
      id
      photo
      alt
      link
      color
    }
  }
`;
