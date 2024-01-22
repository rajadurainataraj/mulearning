import { Box, FormControlLabel, Switch } from "@mui/material"
import { useState } from "react"

const MuiSwitch = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => {
    setChecked(e.target.checked)
  }
  console.log(checked)
  return (
    <Box>
      <FormControlLabel
        label="DarkMode"
        control={
          <Switch onChange={handleChange} size="small" color="success" />
        }
      />
    </Box>
  )
}

export default MuiSwitch
