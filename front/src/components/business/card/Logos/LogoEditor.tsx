import { Logo } from '@lib/types';
import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import HexagonalIcon from '@components/ui/icon/HexagonalIcon';
import { useMutation } from '@apollo/client';
import { UPDATE_LOGO } from '@gql';
import { fileData, fileToBase64 } from '@lib/converter';

type logoForm = Omit<Logo, 'id' | 'photo'> & {
  photo: string | FileList;
};
type UpdateLogoDataType = Omit<Logo, 'id' | 'photo'> & {
  photo: fileData | undefined;
};
interface UpdateLogoVariablesType {
  data: UpdateLogoDataType;
  id?: number;
}

interface UpdateLogoType {
  updateLogo: Logo;
}

const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});
function Vizualisation({ logoValue, logo }: { logoValue: logoForm; logo: Logo }) {
  const photo =
    logoValue.photo && logoValue.photo[0]
      ? URL.createObjectURL(logoValue.photo[0] as Blob)
      : logo.photo;
  const icon: Logo = {
    id: -1,
    ...logoValue,
    photo,
  };

  return <HexagonalIcon logo={icon} disableLink={true} />;
}

function LogoEditor({ logo }: { logo: Logo }): ReactElement {
  const classes = useStyles();
  const formControls = useForm<logoForm>({});
  const { reset } = formControls;
  const values = formControls.watch();
  const [updateLogo] = useMutation<UpdateLogoType>(UPDATE_LOGO, {
    onCompleted: (logo) => {},
    onError: (err) => {},
  });
  const onsubmit = async (value: logoForm) => {
    const photo = value.photo && value.photo[0] ? await fileToBase64(value.photo[0]) : undefined;
    const variables: UpdateLogoVariablesType = {
      data: { ...value, photo },
    };
    if (!logo.new) {
      variables.id = logo.id;
    }
    updateLogo({
      variables,
    });
  };

  useEffect(() => {
    reset({
      link: logo.link,
      alt: logo.alt,
      color: logo.color,
    });
  }, [logo, reset]);
  return (
    <div className={classes.mainContainer}>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onsubmit)} name={'editLogo'}>
          <FormControl>
            <input type="file" {...formControls.register('photo')} />
            <Controller
              {...formControls.register('color')}
              defaultValue={values.color}
              render={({ field: { value, onChange } }) => (
                <>
                  <HexColorPicker color={value} onChange={onChange} />
                  <TextField value={value} onChange={onChange} />
                </>
              )}
            />

            <TextField
              label="lien vers le logo"
              value={values.link || ''}
              {...formControls.register('link')}
            />
            <TextField
              label="texte alternatif"
              value={values.alt || ''}
              {...formControls.register('alt')}
            />
            <Button disableRipple color="primary" autoFocus={true} type="submit">
              {logo.new ? 'Créer' : 'Modifier'}
            </Button>
            <Button disableRipple color="primary" autoFocus={true} type="submit">
              {logo.new ? 'Créer' : 'Modifier'}
            </Button>
          </FormControl>
        </form>
      </FormProvider>
      <Vizualisation logoValue={values} logo={logo} />
    </div>
  );
}
export default LogoEditor;
