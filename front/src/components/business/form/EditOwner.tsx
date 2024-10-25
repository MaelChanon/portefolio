import { Owner } from '@lib/types';
import { Button, DialogActions, FormControl, TextField } from '@material-ui/core';
import { ReactElement, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Presentation from '../panels/Presentation';
import { fileToBase64 } from '@lib/converter';
import { useMutation } from '@apollo/client';
import { UPDATE_OWNER } from '@gql';
interface EditOwner {
  owner: Owner;
}

function EditOwner({ owner }: EditOwner): ReactElement {
  const formControls = useForm();
  const value = formControls.watch();
  const [updateOwner] = useMutation(UPDATE_OWNER, {
    onCompleted(data: any) {
      console.log('blabla');
    },
  });
  function Blabla({ prop, owner }: { prop: any; owner: Owner }): JSX.Element {
    const data: Owner = {
      id: owner.id,
      firstname: prop.firstname || owner.firstname,
      lastname: prop.lastname || owner.lastname,
      role: prop.role || owner.role,
      photo: prop.photo && prop.photo[0] ? URL.createObjectURL(prop.photo[0]) : owner.photo,
      linkedinLink: prop.linkedinLink || owner.linkedinLink,
      githubLink: prop.githubLink || owner.githubLink,
    };
    return <Presentation owner={data} />;
  }
  const onSubmit = async (data: Owner) => {
    console.log('testttttttttttt', data);
    const gqlData: Record<string, any> = { ...data };
    if (gqlData.photo && data.photo[0]) {
      gqlData.photo = await fileToBase64(data.photo[0]);
      console.log('testttttttttttt', gqlData.photo);
    } else if (gqlData.photo) {
      gqlData.photo = undefined;
    }
    updateOwner({
      variables: {
        id: owner.id,
        data: gqlData,
      },
    });
  };
  return (
    <>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)} name={'hoursDoneForm'}>
          <FormControl>
            <TextField
              label="Votre prenom"
              defaultValue={owner.firstname}
              {...formControls.register('firstname')}
            />
            <TextField
              label="Votre nom"
              defaultValue={owner.lastname}
              {...formControls.register('lastname')}
            />
            <TextField
              label="Votre role"
              defaultValue={owner.role}
              {...formControls.register('role')}
            />
            <TextField
              label="Lien github"
              defaultValue={owner.githubLink}
              {...formControls.register('githubLink')}
            />
            <TextField
              label="Lien linkedin"
              defaultValue={owner.linkedinLink}
              {...formControls.register('linkedinLink')}
            />
            <input type="file" {...formControls.register('photo')} />

            <Button disableRipple color="primary" autoFocus={true} type="submit">
              Enregistrer
            </Button>
          </FormControl>
        </form>
      </FormProvider>
      <Blabla prop={{ ...value }} owner={owner} />
    </>
  );
}
export default EditOwner;
