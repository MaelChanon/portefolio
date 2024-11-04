import HexagonalIcon from '@compenents/ui/icon/HexagonalIcon';
import { ReactElement, useEffect, useRef, useState } from 'react';
import Github from '@compenents/ui/logo/Github';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Typography } from '@material-ui/core';
import theme from '@lib/theme';
import { Logo } from '@lib/types';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LOGOS } from '@gql';
import Loader from '@components/ui/progress/loader';
import LogoEditor from './LogoEditor';
import AddIcon from '@mui/icons-material/Add';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'fixed',
    top: '50%',
    right: '50%',
    transform: 'translate(50%,-50%)',
  },
  mainContainer: {
    width: '1080px',
    height: '800px',
    backgroundColor: 'blue',
    display: 'flex',
  },
  logosContainer: {
    width: '60%',
    display: 'flex',
  },
  logoContainer: {
    height: 'fit-content',
  },
  logoEditor: {
    width: '40%',
    display: 'flex',
  },
}));
interface queryData {
  logos: Logo[];
}
function LogoList(): JSX.Element {
  const { data, loading } = useQuery<queryData>(GET_LOGOS);
  const [logo, setLogo] = useState<Logo | undefined>(undefined);
  console.log(data);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.mainContainer}>
        {loading && <Loader />}

        <div className={classes.logosContainer}>
          {data &&
            data.logos.map((logo: Logo) => (
              <ButtonBase
                onClick={() => {
                  setLogo(logo);
                }}
                className={classes.logoContainer}
                key={logo.id}
              >
                <HexagonalIcon disableLink={true} logo={logo} />
              </ButtonBase>
            ))}
          <AddIcon
            onClick={() => {
              setLogo({
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
        <div className={classes.logoEditor}>{logo && <LogoEditor logo={logo} />}</div>
      </div>
    </div>
  );
}
export default LogoList;
