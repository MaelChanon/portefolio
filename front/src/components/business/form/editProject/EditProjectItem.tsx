import { Logo, Project } from '@lib/types';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { ReactElement, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { fileToBase64 } from '@lib/converter';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT, CREATE_PROJECT } from '@gql';
import ProjectItem from '../../card/ProjectItem';
import LogoList from '@components/business/card/Logos/LogoList';
import HexagonalIcon from '@components/ui/icon/HexagonalIcon';
import { useLogos } from '@providers/logosProvider';
import Loader from '@components/ui/progress/loader';
import { ProjectProvider, useProject } from '@providers/projectProvider';

function Visualization({
  prop,
  slide_in_left,
}: {
  prop: any;
  slide_in_left: boolean;
}): JSX.Element {
  const { project } = useProject();
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
  change_order: (value: number) => void;
  max_order: number;
}): ReactElement {
  const { logos: data, loading } = useLogos();
  const formControls = useForm({
    defaultValues: {
      name: project.name,
      description: project.description,
      githubLink: project.githubLink,
      order: project.order,
      videoLink: undefined,
    },
  });
  const value = formControls.watch();

  const [updateProject] = useMutation(project.new ? CREATE_PROJECT : UPDATE_PROJECT, {});
  const [openLogoList, setOpenLogoList] = useState<boolean>(false);
  const [logoList, setLogoList] = useState<Logo[]>(project.logos);

  const onSubmit = async (data: any) => {
    const videoLink =
      data.videoLink && data.videoLink[0] ? await fileToBase64(data.videoLink[0]) : undefined;
    const variables: any = {
      data: {
        ...data,
        videoLink,
        logos: logoList !== project.logos ? logoList.map((logo) => logo.id) : [],
      },
    };
    if (!project.new) {
      variables.id = project.id;
    }
    variables.logos = logoList !== project.logos ? logoList.map((logo) => logo.id) : [];
    console.log(variables);
    updateProject({
      variables,
    });
  };
  if (loading || !data) return <Loader />;
  return (
    <>
      <ProjectProvider project={project}>
        {openLogoList && (
          <LogoList
            enabledLogos={logoList}
            onClose={(logos) => {
              setLogoList(data.filter((logo) => logos.includes(logo.id)));
              setOpenLogoList(false);
            }}
          />
        )}
        <FormProvider {...formControls}>
          <form onSubmit={formControls.handleSubmit(onSubmit)} name={'projectForm'}>
            <FormControl>
              <TextField label="titre" {...formControls.register('name')} />
              <TextField label="description" {...formControls.register('description')} />
              <TextField
                label="lien vers la page github"
                {...formControls.register('githubLink')}
              />

              <input type="file" {...formControls.register('videoLink')} />

              {!project.new && (
                <Controller
                  control={formControls.control}
                  name="order"
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="order">Ordre</InputLabel>
                      <Select
                        {...formControls.register('order')}
                        {...field}
                        labelId="order"
                        label="order"
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
              <div>
                {logoList.map((logo) => (
                  <HexagonalIcon key={logo.id} logo={logo} disableLink={true} />
                ))}
              </div>
              <Button
                disableRipple
                color="primary"
                onClick={() => {
                  setOpenLogoList(true);
                }}
              >
                Ajouter
              </Button>
              <Button disableRipple color="primary" autoFocus={true} type="submit">
                Enregistrer
              </Button>
            </FormControl>
          </form>
        </FormProvider>
        <Visualization prop={value} slide_in_left={slide_in_left} />
      </ProjectProvider>
    </>
  );
}
export default EditProjectItem;
