import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string | undefined;
}) => {
  console.log(className);
  return (
    <IconButton
      className={className}
      aria-label="close"
      onClick={onClose}
      size="small" // optional, for a smaller button size
      sx={{
        color: 'black', // customize color
        '&:hover': {
          color: 'red', // customize hover color
        },
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
