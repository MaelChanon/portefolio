import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CollapsableText from '@compenents/ui/text/CollapsableText';
import Image from 'next/image';
import { Typography } from '@material-ui/core';

// background: rgba(163, 126, 185, 0.1);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(10.9px);
// -webkit-backdrop-filter: blur(10.9px);
// border: 1px solid rgba(163, 126, 185, 0.16);
function BasicTimeline(): React.ReactElement {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">2024 - 2027</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: 'transparent', padding: 0, borderWidth: 0 }}>
            <Image src="/logo/coddity.png" width={30} height={30} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <CollapsableText
            title={'Coddity, Apprenti developpeur fullStack'}
            description={
              "Alternance dans le cadre de mon cycle ingénieur apprenti à l'UTC. Infogérence d'un site intranet de gestion administrative de formations. Utilisation de Next et GraphQL "
            }
            color="#00c896"
            defaultExpanded={true}
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">2022 - 2024</TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: 'transparent', padding: '0', borderWidth: 0 }}>
            <Image src="/logo/capgemini.png" width={30} height={30} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent>
          <CollapsableText
            title={'Capgemini, Apprenti ingénieur logiciel'}
            description={
              "Alternance dans le cadre de mon Bachelor en informatique. Infogérence d'un ensemble de sites publiques avec Nuxt et Api.JS"
            }
            color="#FFFFF"
          />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default BasicTimeline;
