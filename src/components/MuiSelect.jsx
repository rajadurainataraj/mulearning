import { MenuItem, Stack, TextField } from "@mui/material"
import { useState } from "react"

const MuiSelect = () => {
  const [value, setValue] = useState([])
  const handleChange = (e) => {
    const val = e.target.value
    // setValue(typeof val === "string" ? val.split(",") : val)
    setValue([...val])
    console.log("val", val)
  }
  console.log(value)
  return (
    <>
      <Stack>
        <Stack width="250px">
          <TextField
            label="select country"
            select
            multiple
            value={value}
            onChange={handleChange}
            SelectProps={{ multiple: true }}
            helperText={
              value.length === 0
                ? "choose the options"
                : "please select countries"
            }
            error={value.length === 0}
          >
            <MenuItem value="IN">India</MenuItem>
            <MenuItem value="US">USA</MenuItem>
            <MenuItem value="AU">Australia</MenuItem>
          </TextField>
        </Stack>
      </Stack>
    </>
  )
}

export default MuiSelect
