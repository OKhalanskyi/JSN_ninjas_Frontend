import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Superpowers, superpowers } from '@/app/models/ISuperpower.tsx';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  powers: Superpowers[],
  handleChange: (event: SelectChangeEvent<Superpowers[]>) => void
}


export default function MultipleSelect({ powers, handleChange }: Props) {

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={[]}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {superpowers.map((power) => (
            <MenuItem
              key={power}
              value={power}
            >
              {power}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}