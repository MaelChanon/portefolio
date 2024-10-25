import gql from 'graphql-tag';
export const Owner = {
  details: gql`
    fragment OwnerFields on Owner {
      id
      firstname
      lastname
      role
      photo
      linkedinLink
      githubLink
      projects {
        id
        name
        description
        githubLink
        videoLink
        logos {
          id
          photo
          alt
          link
          color
        }
      }
      experiences {
        id
        startDate
        endDate
        logo
        compagny
        title
        description
      }
    }
  `,
};

export const GET_OWNER = gql`
  query owner($id: Int!) {
    owner(id: $id) {
      ...OwnerFields
    }
  }
  ${Owner.details}
`;

export const UPDATE_OWNER = gql`
  mutation updateOwner($id: Int!, $data: UpdateOwnerInput) {
    updateOwner(id: $id, data: $data) {
      id
    }
  }
`;

// mutation updateOwner{
//   updateOwner(
//     id: 1
//     firstname: "Maël"
//   ) {
//     id
//     firstname
//     lastname
//   }
// }
