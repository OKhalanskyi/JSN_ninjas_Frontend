import { useParams } from 'react-router-dom';
import { useGetSuperheroByIdQuery } from '@/app/api/superheroes.api.ts';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { useMemo } from 'react';
import styles from './Superhero.module.scss';
import Loader from '@/components/Loader/Loader.tsx';

const SuperheroPage = () => {
  const { superheroId } = useParams()
  const { data, isFetching, isLoading } = useGetSuperheroByIdQuery(`${superheroId}`);

  const pictures = useMemo(() => {
    return data?.pictures || [];
  }, [data, isFetching])

  if (isLoading || isFetching) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.wrapper}>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {
          pictures.map(picture => (
            <ImageListItem key={picture.id}>
              <img
                srcSet={`${picture.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${picture.url}?w=164&h=164&fit=crop&auto=format`}
                alt={picture.url}
                loading="lazy"
              />
            </ImageListItem>
          ))
        }
      </ImageList>

      <Typography variant="h3">{data?.nickname}</Typography>
      <Typography variant="h4">{data?.real_name}</Typography>
      <Typography variant="body2">{data?.description}</Typography>
      <Typography variant="body2">{data?.catch_phrase}</Typography>
      <Typography variant="h6">{data?.superpowers.map(power => power.name).join(', ')}</Typography>
    </div>
  );
};

export default SuperheroPage;