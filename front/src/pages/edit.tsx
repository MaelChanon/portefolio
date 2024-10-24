import { NextPage } from 'next';
import EditUser from '@components/business/form/EditUser';
const edit: NextPage = () => {
  return (
    <div>
      <EditUser />
    </div>
  );
};

export const getServerSideProps = async function getServerSideProps() {
  return { props: {} };
};

export default edit;
