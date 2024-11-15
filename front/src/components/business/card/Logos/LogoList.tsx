import HexagonalIcon from '@compenents/ui/icon/HexagonalIcon';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import { Logo } from '@lib/types';
import Loader from '@components/ui/progress/loader';
import LogoEditor from './LogoEditor';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@material-ui/core/Checkbox';
import CloseButton from '@components/ui/button/closeButton';
import { useLogos } from '@providers/logosProvider';
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    position: 'fixed',
    top: '50%',
    right: '50%',
    transform: 'translate(50%,-50%)',
  },
  mainContainer: {
    width: '1080px',
    height: '800px',
    display: 'flex',
    /* From https://css.glass */
    background: 'rgba(11, 16, 36, 0.94)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    // -webkit-backdrop-filter: blur(20px);
    border: '1px solid rgba(11, 16, 36, 0.3)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute !important' as any,
    top: 0,
    right: 0,
    zIndex: 2,
  },
  logosContainer: {
    width: '60%',
    height: 'fit-content',
    alignItems: 'center',
    display: 'flex',
    marginTop: '5px',
    marginLeft: '5px',
    gap: '15px',
  },
  logoContainer: {
    height: 'fit-content',
  },
  logoEditor: {
    width: '40%',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '10%',
      height: '80%',
      width: '2px',
      backgroundColor: '#cfc9ba',
    },
  },
  addLogo: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.3',

    '& svg': {
      width: '100%',
      borderRadius: '50%',
      opacity: '0.3',

      height: '100%',
    },
    '&:hover svg': {
      background: '#74ed8e',
    },
  },
}));
interface queryData {
  logos: Logo[];
}
interface LogoListType {
  onClose: (logos: number[]) => void;
  enabledLogos: Logo[];
}
function LogoList({ onClose, enabledLogos }: LogoListType): JSX.Element {
  const { logos: data, loading } = useLogos();
  const [logos, setLogos] = useState<Logo[]>([]);
  const [editedLogo, setEditedLogo] = useState<Logo | undefined>(undefined);
  const [enabledLogoIds, setEnabledLogoIds] = useState<number[]>(
    enabledLogos.map((logo) => logo.id)
  );

  const classes = useStyles();
  if (data && logos.length == 0) {
    setLogos(data);
  }
  return (
    <div className={classes.container}>
      <div className={classes.mainContainer}>
        {loading && <Loader />}
        <CloseButton
          className={classes.closeButton}
          onClose={() => {
            onClose(enabledLogoIds);
          }}
        />

        <div className={classes.logosContainer}>
          {logos.map((logo: Logo) => (
            <div key={logo.id}>
              <ButtonBase
                onClick={() => {
                  setEditedLogo(logo);
                }}
                className={classes.logoContainer}
              >
                <HexagonalIcon disableLink={true} logo={logo} />
              </ButtonBase>
              <div>
                <Checkbox
                  checked={enabledLogoIds.includes(logo.id)}
                  onChange={() => {
                    if (enabledLogoIds.includes(logo.id)) {
                      setEnabledLogoIds(enabledLogoIds.filter((item) => item !== logo.id));
                    } else {
                      setEnabledLogoIds([...enabledLogoIds, logo.id]);
                    }
                  }}
                />
              </div>
            </div>
          ))}
          <div className={classes.addLogo}>
            <AddIcon
              onClick={() => {
                setEditedLogo({
                  id: -1,
                  alt: '',
                  color: '',
                  link: '',
                  photo: '',
                  new: true,
                });
              }}
            />
          </div>
        </div>
        <div className={classes.logoEditor}>
          {editedLogo && (
            <LogoEditor
              logo={editedLogo}
              onDelete={() => {
                setLogos(logos.filter((logoItem) => logoItem.id != editedLogo.id));
                setEditedLogo(undefined);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default LogoList;
