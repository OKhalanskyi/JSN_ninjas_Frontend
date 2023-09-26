import styles from './Header.module.scss';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { getHomePath } from '@/shared/constants/getRoutes.ts';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useTheme } from '@/app/providers/Theme/useTheme.ts';
import { Theme } from '@/app/providers/Theme/ThemeContext.ts';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.Header}>
      <Link
        to={getHomePath()}
        className={styles.HomeLink}
      >
        <Typography variant="h6">
          SUPERHEROES
        </Typography>
      </Link>

      <IconButton
        aria-label="theme"
        onClick={toggleTheme}
      >
        {
          theme === Theme.LIGHT ? (
            <WbSunnyRoundedIcon className={styles.icon}/>
          ) : (
            <NightlightRoundedIcon className={styles.icon}/>
          )
        }
      </IconButton>
    </header>
  );
};

export default Header;
