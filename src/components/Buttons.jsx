import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import styles from "./Button.module.css"
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"

import AlarmIcon from "@mui/icons-material/Alarm"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import Fingerprint from "@mui/icons-material/Fingerprint"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import styled from "styled-components"
import LoadingButton from "@mui/lab/LoadingButton"
import SaveIcon from "@mui/icons-material/Save"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import { useState } from "react"

// import Link from "@mui/material"

// import SaveIcon from "@mui/icons-material/Save"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const Buttons = () => {
  const [formates, setformates] = useState()
  const handleToggleChange = (_e, updatedFormates) => {
    setformates(updatedFormates)
  }
  console.log(formates)
  return (
    <>
      <div className={styles.flex_col}>
        <div>Buttons</div>
        <Button variant="contained" onClick={() => console.log("hello")}>
          Contained
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button>Primary</Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons">Link</Button>
        <Button variant="contained" disableElevation>
          Disable elevation
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <div> colors</div>
        <Button color="secondary" size="medium">
          Secondary
        </Button>
        <Button variant="contained" color="success" size="large">
          Success
        </Button>
        <Button variant="outlined" color="error" size="small">
          Error
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={4}>
          <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
          </IconButton>
          <IconButton aria-label="fingerprint" color="success">
            <Fingerprint />
          </IconButton>
        </Stack>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        <span style={{ cursor: "not-allowed" }}>
          {/* <Button component={Link} disabled>
            disabled
          </Button> */}
        </span>
        <Stack direction="row" spacing={2}>
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
          <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
            Fetch data
          </LoadingButton>
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
          >
            Save
          </LoadingButton>
        </Stack>
        <Stack direction="row">
          <ButtonGroup
            variant="contained"
            orientation="vertical"
            color="secondary"
            size="small"
            aria-label="butto group"
          >
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Stack>
      </div>
      <div className={styles.flex_col}>
        <Stack>
          <ToggleButtonGroup
            aria-label="text grouping"
            orientation="vertical"
            value={formates}
            onChange={handleToggleChange}
            exclusive
          >
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underline">
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </div>
    </>
  )
}

export default Buttons
