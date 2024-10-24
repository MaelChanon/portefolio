import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import CollapsableText from '@compenents/ui/text/CollapsableText';
import Image from 'next/image';
import { Experience } from '@lib/types';

interface TimelineType {
  experiences: Experience[];
}
function BasicTimeline({ experiences }: TimelineType): React.ReactElement {
  let isMostRecentExperience = true;
  return (
    <Timeline position="alternate">
      {experiences.map((experience) => {
        const startYear = new Date(experience.startDate).getFullYear();
        const endYear = new Date(experience.endDate).getFullYear();
        const component = (
          <TimelineItem key={experience.id}>
            <TimelineOppositeContent
              sx={{ color: '#FFFFFF' }}
            >{`${startYear} - ${endYear}`}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: 'transparent', padding: 0, borderWidth: 0 }}>
                <Image src={experience.logo} width={30} height={30} alt="logo" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <CollapsableText
                title={experience.title}
                description={experience.description}
                color={isMostRecentExperience ? '#00c896' : '#FFFFFF'}
                defaultExpanded={isMostRecentExperience}
              />
            </TimelineContent>
          </TimelineItem>
        );
        isMostRecentExperience = false;
        return component;
      })}
    </Timeline>
  );
}

export default BasicTimeline;
