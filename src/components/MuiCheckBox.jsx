import {
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material"
import { useState } from "react"
import AlarmIcon from "@mui/icons-material/Alarm"

const MuiCheckBox = () => {
  const [acceptTnc, setAcceptTnc] = useState(false)
  const [skills, setSkills] = useState([])
  const handleChange = (e) => {
    setAcceptTnc(e.target.checked)
  }

  const handleSkillChange = (e) => {
    const index = skills.indexOf(e.target.value)
    console.log(index)
    if (index === -1) {
      setSkills([...skills, e.target.value])
    } else {
      setSkills(skills.filter((skill) => skill !== e.target.value))
    }
  }
  console.log(skills)
  return (
    <Box>
      <Box>
        <FormControlLabel
          label="I accept terms and conditions"
          control={<Checkbox checked={acceptTnc} onChange={handleChange} />}
        />
      </Box>
      <Box>
        <Checkbox
          icon={<AlarmIcon />}
          checkedIcon={<AlarmIcon />}
          checked={acceptTnc}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <FormGroup>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <FormControlLabel
              label="HTML"
              control={
                <Checkbox
                  value="html"
                  checked={skills.includes("html")}
                  onChange={handleSkillChange}
                />
              }
            />
            <FormControlLabel
              label="CSS"
              control={
                <Checkbox
                  value="css"
                  checked={skills.includes("css")}
                  onChange={handleSkillChange}
                />
              }
            />
            <FormControlLabel
              label="JS"
              control={
                <Checkbox
                  value="js"
                  checked={skills.includes("js")}
                  onChange={handleSkillChange}
                />
              }
            />
          </FormControl>
        </FormGroup>
      </Box>
    </Box>
  )
}

export default MuiCheckBox
