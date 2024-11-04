import { Owner, Project } from '@lib/types';
import { ButtonBase } from '@material-ui/core';
import { ReactElement, useState } from 'react';
import EditProjectItem from './EditProjectItem';
import LogoList from '@components/business/card/Logos/LogoList';

function EditProjects({ projects }: { projects: Project[] }): ReactElement {
  let slide_in_left = true;

  const [items, setItems] = useState([...projects]);

  // const pojectList = projects.slice().sort((a, b) => a.order - b.order);
  const reorder = (previousId: number, newId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.order === previousId) return { ...item, order: newId };
        if (item.order === newId) return { ...item, order: previousId };
        return item;
      })
    );
  };
  const pojectList = [...items].sort((a, b) => a.order - b.order);

  return (
    <>
      <LogoList />
      <ButtonBase
        onClick={() => {
          const project: Project = {
            name: '',
            description: '',
            githubLink: '',
            videoLink: '',
            order: (projects?.at(-1)?.order || 1) + 1,
            logos: [],
            new: true,
          };
          setItems([...projects, project]);
        }}
      >
        ajouter
      </ButtonBase>
      {pojectList.map((project: Project) => {
        return (
          <EditProjectItem
            project={project}
            slide_in_left={slide_in_left}
            key={project.name}
            max_order={pojectList.at(-1)?.order || 0}
            change_order={(value: number | undefined) => {
              if (!value) return;
              reorder(project.order, value);
            }}
          />
        );
      })}
    </>
  );
}
export default EditProjects;
