import { Experience } from '@lib/types';
import { Button, FormControl, TextField } from '@material-ui/core';
import { ReactElement, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT, CREATE_PROJECT } from '@gql';
import { fileToBase64 } from '@lib/converter';
import dayjs, { Dayjs } from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import 'dayjs/locale/en-gb';

type ExperienceFormType = Omit<Experience, 'logo' | 'startDate' | 'endDate'> & {
  logo: any;
  startDate: Dayjs;
  endDate: Dayjs;
};
function EditExperienceItem({
  experience,
  onChange,
}: {
  experience: Experience;
  onChange: (newExperience: Experience) => void;
}): ReactElement {
  const formControls = useForm<ExperienceFormType>({
    // defaultValues: {
    //   id: experience.id,
    //   title: experience.title,
    //   description: experience.description,
    //   startDate: dayjs(experience.startDate),
    //   endDate: dayjs(experience.endDate),
    //   company: experience.company,
    // },
  });
  const reset = formControls.reset;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    reset({
      id: experience.id,
      title: experience.title,
      description: experience.description,
      startDate: dayjs(experience.startDate),
      endDate: dayjs(experience.endDate),
      company: experience.company,
    });
  }, [experience, reset]);
  const value = formControls.watch();

  const [updatExperience] = useMutation(false ? CREATE_PROJECT : UPDATE_PROJECT, {});

  const onSubmit = async (data: ExperienceFormType) => {
    const logo = data.logo && data.logo[0] ? await fileToBase64(data.logo[0]) : undefined;
    const variables: any = {
      data: {
        ...data,
        logo,
      },
    };
    if (!experience.new) {
      variables.id = experience.id;
    }
    // updateProject({
    //   variables,
    // });
  };

  const onFormChange = () => {
    if (!value.startDate.isValid() || !value.endDate.isValid()) return;

    const logo =
      value.logo && value.logo[0] ? URL.createObjectURL(value.logo[0] as Blob) : experience.logo;

    const data: Experience = {
      id: value.id,
      company: value.company,
      title: value.title,
      description: value.description,
      startDate: value.startDate.toISOString(),
      endDate: value.endDate.toISOString(),
      logo: logo,
    };
    onChange(data);
  };
  return (
    <>
      <FormProvider {...formControls}>
        <form
          onChange={onFormChange}
          onSubmit={formControls.handleSubmit(onSubmit)}
          name={'projectForm'}
        >
          <FormControl>
            <TextField label="titre" {...formControls.register('title')} />
            <TextField label="description" {...formControls.register('description')} />
            <Controller
              name={'startDate'}
              control={formControls.control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setTimeout(onFormChange, 0);
                  }}
                  slotProps={{
                    textField: {
                      helperText: 'DD/MM/YYYY',
                    },
                  }}
                />
              )}
            />

            <Controller
              name="endDate"
              control={formControls.control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="DD/MM/YYYY"
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setTimeout(onFormChange, 0);
                  }}
                  slotProps={{
                    textField: {
                      helperText: 'DD/MM/YYYY',
                    },
                  }}
                />
              )}
            />

            <input type="file" {...formControls.register('logo')} />
            <Button disableRipple color="primary" autoFocus={true} type="submit">
              Enregistrer
            </Button>
          </FormControl>
        </form>
      </FormProvider>
    </>
  );
}
export default EditExperienceItem;
