import SuperheroesList from '@/components/SuperheroesList/SuperheroesList.tsx';
import Toolbar from '@/components/Toolbar/Toolbar.tsx';
import styles from './HomePage.module.scss';
import { Pagination } from '@mui/material';
import { useGetAllSuperheroesQuery } from '@/app/api/superheroes.api.ts';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchWith } from '@/shared/utils/useSearchWith.ts';
import Loader from '@/components/Loader/Loader.tsx';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchPage = searchParams.get('page')
  const [page, setPage] = useState(searchPage ? +searchPage : 1)
  const { data, isFetching, isLoading } = useGetAllSuperheroesQuery({ page },{ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (data?.pages && searchPage) {
      if (data?.pages < +searchPage) {
        setPage(1);
        setSearchParams(useSearchWith(searchParams, { page: '1' }))
      }
    }
  }, [page, searchPage, isFetching]);

  const superheroes = useMemo(() => {
    if (data) {
      return data?.superheroes
    }
  }, [data, isFetching])

  if (isFetching || isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className={styles.HomePage}>
      <Toolbar />
      <SuperheroesList superheroes={superheroes}/>
      <Pagination
        page={page}
        color="secondary"
        className={styles.pagination}
        count={data?.pages}
        size="large"
        onChange={(_, page) => {
          setPage(page)
          setSearchParams(useSearchWith(searchParams, { page: `${page}` }))
        }}
      />
    </div>
  );
};

export default HomePage;