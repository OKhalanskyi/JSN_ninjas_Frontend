import SuperheroCard from '@/components/SuperheroCard/SuperheroCard.tsx';
import styles from './SuperheroesList.module.scss';
import React from 'react';
import { ISuperhero } from '@/app/models/ISuperhero.ts';

type Props = {
  superheroes?: ISuperhero[]
}

const SuperheroesList: React.FC<Props> = ({superheroes}) => {
  return (
    <div className={styles.GridWrapper}>
      <div className={styles.SuperheroList}>
        {superheroes?.map(superhero => (
          <SuperheroCard
            key={superhero.id}
            superhero={superhero}
          />
        ))}
      </div>
    </div>
  );
};

export default SuperheroesList;