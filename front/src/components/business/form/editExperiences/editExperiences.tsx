import { Experience, Project } from '@lib/types';
import { ButtonBase } from '@material-ui/core';
import { ReactElement, useState } from 'react';
import EditExperienceItem from './editExperienceItem';
import Timeline from '@compenents/business/panels/Timeline';

function EditExperiences({ experiences }: { experiences: Experience[] }): ReactElement {
  const DateSort = (a: Experience, b: Experience) => {
    return Date.parse(b.startDate) - Date.parse(a.startDate);
  };

  const [items, setItems] = useState<Experience[]>([...experiences].sort(DateSort));
  const [displayedExperiences, setDisplayedExperiences] = useState<Experience[]>([...items]);
  const createNewExperience = () => {
    const experience: Experience = {
      id: '',
      title: 'test',
      description: '',
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      logo: '',
      company: '',
    };
    setItems([...displayedExperiences, experience].sort(DateSort));
  };

  return (
    <>
      <ButtonBase onClick={createNewExperience}>ajouter</ButtonBase>
      {items.map((experience: Experience, idx: number) => {
        console.log(idx, ' ', experience);
        return (
          <EditExperienceItem
            key={idx}
            experience={experience}
            onChange={(newExperience: Experience) => {
              const cpy = [...displayedExperiences];
              cpy[idx] = newExperience;
              setDisplayedExperiences(cpy);
              console.log(displayedExperiences);
            }}
          />
        );
      })}
      <Timeline experiences={displayedExperiences} />
    </>
  );
}
export default EditExperiences;
