import styles from './Toolbar.module.scss';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Form from '@/components/Form/Form';
import { useGetAllSuperheroesQuery } from '@/app/api/superheroes.api.ts';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Toolbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetAllSuperheroesQuery({},{ refetchOnMountOrArgChange: true });

  return (
    <div className={styles.Toolbar}>
      <Typography variant="body1">
        {`${data?.total} cards were found`}
      </Typography>

      <Button
        variant="contained"
        color="warning"
        onClick={() => setIsModalOpen(true)}
      >ADD NEW HERO</Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={style}>
          <Form onSubmit={() => {
            setIsModalOpen(false)
            location.reload();
          }}/>
        </Box>
      </Modal>
    </div>
  );
};

export default Toolbar;