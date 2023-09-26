import React from 'react';
import { ISuperhero } from '@/app/models/ISuperhero.ts';
import { Link } from 'react-router-dom';
import { getSuperheroPath } from '@/shared/constants/getRoutes.ts';
import styles from './SuperheroCard.module.scss';
import { Typography } from '@mui/material';

type SuperheroCardProps = {
  superhero: ISuperhero,
}

const SuperheroCard:React.FC<SuperheroCardProps> = ({ superhero }) => {
  const {
    id,
    nickname,
    reference_image
  } = superhero

  return (
      <Link
        to={{ pathname: getSuperheroPath(id)}}
        className={styles.SuperheroCard}
      >
        <div className={styles.imageWrapper}>
          <img src={reference_image} alt={nickname} />
        </div>
        <Typography className={styles.nickname} variant="button">{nickname}</Typography>
      </Link>
  );
};

export default SuperheroCard;