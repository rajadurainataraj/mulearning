import { InputAdornment, Stack, TextField } from "@mui/material"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import { useState } from "react"
const MuiTextField = () => {
  const [value, setValue] = useState("")
  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={4}>
          <TextField label="Name" type="email" variant="outlined" required />
          <TextField label="Name" type="password" variant="filled" required />
          <TextField label="Name" variant="standard" required />
        </Stack>
        <Stack direction="row" spacing={4}>
          <TextField
            label="small"
            type="password"
            size="small"
            color="secondary"
          />
          <TextField
            label="readonly"
            size="medium"
            color="secondary"
            inputProps={{ readOnly: true }}
          />
          <TextField
            label="large"
            type="password"
            size="large"
            color="secondary"
            helperText="do not share password with anyone"
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={4}>
        <TextField
          label="Weight"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <FitnessCenterIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Weight"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <FitnessCenterIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setValue(e.target.value)}
          error={!value}
          helperText={!value ? "required" : "help me to fill this form"}
        />
      </Stack>
    </>
  )
}

export default MuiTextField
