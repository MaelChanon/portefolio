import { Owner, Project } from '@lib/types';
import {
  Button,
  ButtonBase,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { ReactElement, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Presentation from '../../panels/Presentation';
import { fileToBase64 } from '@lib/converter';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT, CREATE_PROJECT } from '@gql';
import ProjectItem from '../../card/ProjectItem';

function Visualization({
  prop,
  project,
  slide_in_left,
}: {
  prop: any;
  project: Project;
  slide_in_left: boolean;
}): JSX.Element {
  const data: Project = {
    id: project.id,
    name: prop.name || project.name,
    description: prop.description || project.description,
    githubLink: prop.githubLink || project.githubLink,
    logos: project.logos,
    videoLink:
      prop.videoLink && prop.videoLink[0]
        ? URL.createObjectURL(prop.videoLink[0])
        : project.videoLink,
    order: prop.order || project.order,
  };
  return <ProjectItem project={data} slide_in_left={slide_in_left} />;
}

function EditProjectItem({
  project,
  slide_in_left,
  change_order,
  max_order,
}: {
  project: Project;
  slide_in_left: boolean;
  change_order: (value: number | undefined) => void;
  max_order: number;
}): ReactElement {
  const formControls = useForm();
  const value = formControls.watch();
  const [updateProject] = useMutation(project.new ? CREATE_PROJECT : UPDATE_PROJECT, {});
  // if(value.form)

  const onSubmit = async (data: any) => {
    const videoLink =
      data.videoLink && data.videoLink[0] ? await fileToBase64(data.videoLink[0]) : undefined;
    const variables: any = {
      data: { ...data, videoLink },
    };
    if (!project.new) {
      variables.id = project.id;
    }
    updateProject({
      variables,
    });
  };
  return (
    <>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)} name={'projectForm'}>
          <FormControl>
            <TextField
              label="titre"
              defaultValue={project.name}
              {...formControls.register('name')}
            />
            <TextField
              label="description"
              defaultValue={project.description}
              {...formControls.register('description')}
            />
            <TextField
              label="lien vers la page github"
              defaultValue={project.githubLink}
              {...formControls.register('githubLink')}
            />

            <input type="file" {...formControls.register('videoLink')} />

            {!project.new && (
              <Controller
                control={formControls.control}
                name="order"
                defaultValue={project.order}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="order">Ordre</InputLabel>
                    <Select
                      {...formControls.register('order')}
                      {...field}
                      labelId="order"
                      label="order"
                      defaultValue={project.order}
                      onChange={(event) => {
                        field.onChange(event); // important to update form state
                        change_order(event?.target?.value as number);
                      }}
                    >
                      {Array.from({ length: max_order }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            )}
            <Button disableRipple color="primary" autoFocus={true} type="submit">
              Enregistrer
            </Button>
          </FormControl>
        </form>
      </FormProvider>
      <Visualization prop={value} project={project} slide_in_left={slide_in_left} />
    </>
  );
}
export default EditProjectItem;
