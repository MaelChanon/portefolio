import { Owner } from '@lib/types';
import { Button, FormControl, TextField } from '@material-ui/core';
import { ReactElement, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Presentation from '../panels/Presentation';
interface EditUser {
  user: Owner;
}
function Blabla({ prop }: any): JSX.Element {
  const owner: Owner = {
    id: '0',
    firstname: prop.firstname,
    lastName: prop.lastName,
    role: prop.role,
    photo: '',
    linkedinLink: prop.linkedinLink,
    githubLink: prop.linkedinLink,
  };
  console.log(prop.test);
  return <Presentation owner={owner} />;
}
function EditUser({ user }: EditUser): ReactElement {
  const formControls = useForm();
  const [owner, setOwner] = useState<Owner>(user);
  const value = formControls.watch();
  console.log(value);
  return (
    <>
      <FormProvider {...formControls}>
        <FormControl>
          <TextField label="Votre prenom" {...formControls.register('firstname')} />
          <TextField label="Votre nom" {...formControls.register('lastname')} />
          <TextField label="Votre role" {...formControls.register('role')} />
          <TextField label="Lien github" {...formControls.register('githubLink')} />
          <TextField label="Lien linkedin" {...formControls.register('linkedinLink')} />
          <TextField type="file" {...formControls.register('photo')} />

          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </FormControl>
      </FormProvider>
      <Blabla prop={{ ...value, id: user?.id || '1' }} />
    </>
  );
}
export default EditUser;
