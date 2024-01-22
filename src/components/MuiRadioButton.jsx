import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material"
import { useState } from "react"

const MuiRadioButton = () => {
  const [value, setValue] = useState("")
  console.log(value)
  return (
    <Box>
      <FormControl id="job-experience-group" error>
        <FormLabel>Year of experience</FormLabel>
        <RadioGroup
          name="job-experience-group"
          aria-labelledby="job-experience-group"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          row
        >
          <FormControlLabel control={<Radio />} label="0-2" value="0-2" />
          <FormControlLabel control={<Radio />} label="0-5" value="0-5" />
          <FormControlLabel control={<Radio />} label="0-6" value="0-6" />
        </RadioGroup>
        <FormHelperText>invalid selection</FormHelperText>
      </FormControl>
    </Box>
  )
}

export default MuiRadioButton
