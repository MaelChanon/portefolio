import { Owner, Project } from '@lib/types';
import { Button, FormControl, TextField } from '@material-ui/core';
import { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Presentation from '../panels/Presentation';
import { fileToBase64 } from '@lib/converter';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '@gql';
import ProjectItem from '../card/ProjectItem';

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
  };
  return <ProjectItem project={data} slide_in_left={slide_in_left} />;
}
function EditProjects({ projects }: { projects: Project[] }): ReactElement {
  let slide_in_left = true;
  function EditProjectItem({
    project,
    slide_in_left,
  }: {
    project: Project;
    slide_in_left: boolean;
  }): ReactElement {
    const formControls = useForm();
    const value = formControls.watch();
    const [updateProject] = useMutation(UPDATE_PROJECT, {});

    const onSubmit = async (data: any) => {
      const videoLink =
        data.videoLink && data.videoLink[0]
          ? await fileToBase64(data.videoLink[0])
          : project.videoLink;
      const gqlData: Record<string, any> = Object.entries({ ...data, videoLink }).reduce<any>(
        (acc: Record<string, any>, [key, value]: [string, any]) => {
          if (value && project[key] !== value) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      if (!gqlData) return;
      updateProject({
        variables: {
          id: project.id,
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

  return (
    <>
      {projects.map((project: Project) => {
        slide_in_left = !slide_in_left;
        return (
          <EditProjectItem project={project} slide_in_left={slide_in_left} key={project.name} />
        );
      })}
    </>
  );
}
export default EditProjects;
