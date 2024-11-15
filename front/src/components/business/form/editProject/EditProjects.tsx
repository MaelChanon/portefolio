import { Project } from '@lib/types';
import { ButtonBase } from '@material-ui/core';
import { ReactElement, useState } from 'react';
import EditProjectItem from './EditProjectItem';
import { LogosProvider } from '@providers/logosProvider';

function EditProjects({ projects }: { projects: Project[] }): ReactElement {
  let slide_in_left = true;

  const [items, setItems] = useState([...projects]);
  const pojectList = [...items].sort((a, b) => a.order - b.order);
  // const pojectList = projects.slice().sort((a, b) => a.order - b.order);
  const changeProjectOrder = (previousId: number, newId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.order === previousId) return { ...item, order: newId };
        if (item.order === newId) return { ...item, order: previousId };
        return item;
      })
    );
  };
  const createNewProject = () => {
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
  };

  return (
    <>
      <ButtonBase onClick={createNewProject}>ajouter</ButtonBase>
      <LogosProvider>
        {pojectList.map((project: Project) => {
          return (
            <EditProjectItem
              project={project}
              slide_in_left={slide_in_left}
              key={project.name}
              max_order={pojectList.at(-1)?.order || 0}
              change_order={(value: number) => {
                changeProjectOrder(project.order, value);
              }}
            />
          );
        })}
      </LogosProvider>
    </>
  );
}
export default EditProjects;
