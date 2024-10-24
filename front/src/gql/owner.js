import gql from 'graphql-tag';
export const Owner = {
  details: gql`
    fragment OwnerFields on Owner {
      id
      firstname
      lastName
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
