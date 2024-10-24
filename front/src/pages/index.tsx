import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core';
import Presentation from '@compenents/business/panels/Presentation';
import Projects from '@compenents/business/panels/Projects';
import Timeline from '@compenents/business/panels/Timeline';
import { useQuery, gql } from '@apollo/client';
import { GET_OWNER } from '@graphql';
import Loader from '@compenents/ui/progress/loader';
import { Owner } from '@types';
interface Type {
  user: string;
}
const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1080px',
  },
}));

const Index: NextPage<Type> = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery<{
    owner: Owner;
  }>(GET_OWNER, {
    variables: {
      id: 1,
    },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Error in data fetching</p>;
  return (
    <div className={classes.container}>
      <Presentation owner={data.owner} />
      {data.owner.projects && <Projects projects={data.owner.projects} />}
      {data.owner.experiences && <Timeline experiences={data.owner.experiences} />}
    </div>
  );
};

export const getServerSideProps = async function getServerSideProps() {
  return { props: {} };
};

export default Index;
