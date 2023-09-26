import { Autocomplete, Button, styled, TextField, Typography } from '@mui/material';
import { DragEvent, useState, FC } from 'react';
import styles from './Form.module.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { Superpowers, superpowers } from '@/app/models/ISuperpower.tsx';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = {
  onSubmit: () => void
}

const Form:FC<Props> = ({onSubmit}) => {
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  console.log(imageFiles);
  const [dragActive, setDragActive] = useState(false);

  const [nickName, setNickName] = useState('');
  const [realName, setRealName] = useState('');
  const [description, setDescription] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [powers, setPowers] = useState<Superpowers[]>([Superpowers.Telekinesis])

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formData = new FormData()

  imageFiles?.forEach((file) => formData.append('file', file))
  formData.append('nickname', nickName);
  formData.append('real_name', realName);
  formData.append('description', description);
  formData.append('catch_phrase', catchPhrase);
  formData.append('superpowers', JSON.stringify(powers));


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDrag = function (event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(true);
  };

  const handleLeave = function (event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files) {
      setImageFiles((prevState) => prevState ? [...prevState, ...event.dataTransfer.files] : [...event.dataTransfer.files])
    }
  };

  const nickNameRegister = register('nickName', { required: true });
  const realNameRegister = register('realName', { required: true });
  const descriptionRegister = register('description', { required: true });
  const catchPhraseRegister = register('catchPhrase', { required: true });

  // @ts-ignore
  return (
    <form
      className={styles.Form}
      onSubmit={handleSubmit(async (_, event) => {
        event?.preventDefault()

        if (!imageFiles?.length) {
          setError(true)
        } else {
          setLoading(true)

          await fetch('http://localhost:3000/superhero', {
            body: formData,
            method: 'POST'
          })
          onSubmit()
          setLoading(false)
        }
      })}
    >
      {
        error && (
          <Typography align="center" variant="caption" color="red" >
            At least one image is required
          </Typography>
        )
      }

      <div
        className={classNames('', {
          [styles.drag_active]: dragActive,
          [styles.drag_error]: error
        }, [styles.drag])}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleLeave}
        onDrop={handleDrop}
      >
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => {
              if (event.target.files) {
                // @ts-ignore
                setImageFiles(prevState => prevState ? [...prevState, ...event.target.files] : [...event.target.files])
              }
            }}
          />
        </Button>
      </div>

      {
        imageFiles && (
          <div className={styles.imageNames}>
            {imageFiles?.map(file => (
              <div className={styles.imageNameBox} key={Math.random()*Math.random()*Math.random()}>
                <Typography variant="caption">
                  {file.name}
                </Typography>
                <IconButton
                  onClick={() => setImageFiles(prevState => prevState && prevState.filter(f => f !== file))}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )
      }

      <Autocomplete
        multiple
        id="tags-outlined"
        options={superpowers}
        getOptionLabel={(option) => option}
        onChange={(_, newValue, reason) => {
          switch (reason) {
            case 'clear':
              setPowers([]);
              break
            case 'selectOption':
              setPowers(newValue);
              break
            case 'removeOption':
              setPowers(newValue)
              break
          }
        }}
        value={powers}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Superpowers"
            placeholder="Superpowers"
          />
        )}
      />

      <TextField
        value={nickName}
        {...nickNameRegister}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNickName(event.target.value);
        }}
        error={errors.nickName && true}
        id="outlined-required"
        label="Nickname"
      />

      <TextField
        value={realName}
        {...realNameRegister}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRealName(event.target.value);
        }}
        error={errors.realName && true}
        id="outlined-required"
        label="Real name"
      />

      <TextField
        value={description}
        {...descriptionRegister}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        }}
        error={errors.description && true}
        id="outlined-required"
        label="Description"
      />

      <TextField
        value={catchPhrase}
        {...catchPhraseRegister}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCatchPhrase(event.target.value);
        }}
        error={errors.catchPhrase && true}
        id="outlined-required"
        label="Catch phrase"
      />

      <span>
        <Button
          disabled={loading}
          variant="outlined"
          type="submit"
          onClick={() => {
            if (!imageFiles?.length) {
              setError(true)
            } else {
              setError(false)
            }
          }}
        >
          SUBMIT
        </Button>
      </span>

    </form>

  );
};

export default Form;