import { NextPage } from 'next';
import EditOwner from '@components/business/form/EditOwner';
import { useOwner } from '@providers/ownerProvider';
import Loader from '@components/ui/progress/loader';
import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import EditProjects from '@components/business/form/editProject/EditProjects';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@gql';
import { useRouter } from 'next/router';
const useStyles = makeStyles({
  container: {
    width: '100vw',
    maxWidth: '1080px',
  },
});
const Edit: NextPage = () => {
  const formControls = useForm();
  const router = useRouter();
  const onSubmit = (data: any) => {
    fetch(`/api/login?password=${data.password}`).then(() => {
      router.push('/edit');
    });
  };
  return (
    <FormProvider {...formControls}>
      <form onSubmit={formControls.handleSubmit(onSubmit)}>
        <FormControl>
          <TextField label="mot-de-passe" type="password" {...formControls.register('password')} />

          <Button disableRipple color="primary" autoFocus={true} type="submit">
            Enregistrer
          </Button>
        </FormControl>
      </form>
    </FormProvider>
  );
};

export const getServerSideProps = async function getServerSideProps() {
  return { props: {} };
};

export default Edit;
