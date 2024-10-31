import { NextPage } from 'next';
import EditOwner from '@components/business/form/EditOwner';
import { useOwner } from '@providers/ownerProvider';
import Loader from '@components/ui/progress/loader';
import { makeStyles } from '@material-ui/core';
import EditProjects from '@components/business/form/EditProjects';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    maxWidth: '1080px',
  },
});
const Edit: NextPage = () => {
  const classes = useStyles();
  const { owner, loading, error } = useOwner();
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={classes.container}>
      {owner && <EditOwner owner={owner} />}
      {owner?.projects && <EditProjects projects={owner.projects} />}
    </div>
  );
};

export const getServerSideProps = async function getServerSideProps() {
  return { props: {} };
};

export default Edit;
