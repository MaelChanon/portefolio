import { ReactElement, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@material-ui/core';
type CollapsableTextType = {
  title: string;
  description: string;
  color: string;
  defaultExpanded?: boolean;
};

function CollapsableText({
  title,
  description,
  color,
  defaultExpanded,
}: CollapsableTextType): ReactElement {
  const [expanded] = useState<boolean>(!!defaultExpanded);
  return (
    <Accordion
      defaultExpanded={expanded}
      sx={{
        bgcolor: 'rgba(163, 126, 185, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10.9px)',
        border: '1px solid rgba(163, 126, 185, 0.16)',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF' }} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h5" component="p" style={{ color }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default CollapsableText;
