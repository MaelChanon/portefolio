import { Owner } from '@lib/types';
import { Button, FormControl, TextField } from '@material-ui/core';
import { ReactElement } from 'react';
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
  let isModified = false;
  const [updateOwner] = useMutation(UPDATE_OWNER, {
    onCompleted: () => {
      isModified = false;
    },
  });

  function Visualization({ prop, owner }: { prop: any; owner: Owner }): JSX.Element {
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
  const onSubmit = async (data: any) => {
    if (!isModified) return;
    const photo = data.photo && data.photo[0] ? await fileToBase64(data.photo[0]) : undefined;
    const gqlData: Record<string, any> = { ...data, photo };
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
        <form
          onChange={() => {
            isModified = true;
          }}
          onSubmit={formControls.handleSubmit(onSubmit)}
          name={'hoursDoneForm'}
        >
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
      <Visualization prop={value} owner={owner} />
    </>
  );
}
export default EditOwner;
