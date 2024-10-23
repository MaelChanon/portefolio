import { NextPage } from 'next';
import { makeStyles } from '@material-ui/core';
import Presentation from '@compenents/business/panels/Presentation';
import Projects from '@compenents/business/panels/Projects';
import Timeline from '@compenents/business/panels/Timeline';
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
  // Render
  return (
    <div className={classes.container}>
      <Presentation />
      <Projects />
      <Timeline />
    </div>
  );
};

export const getServerSideProps = async function getServerSideProps() {
  return { props: {} };
};

export default Index;
