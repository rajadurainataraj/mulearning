import { Typography } from "@mui/material"
const MuiTypography = () => {
  return (
    <div>
      <Typography variant="h1">H1 Heading</Typography>
      <Typography variant="h2">H2 Heading</Typography>
      <Typography variant="h3">H3 Heading</Typography>
      <Typography variant="h4">H4 Heading</Typography>
      <Typography variant="h5" gutterBottom>
        H5 Heading
      </Typography>
      <Typography variant="h6">H6 Heading</Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur modi
        numquam aspernatur ad? Corrupti odit incidunt fugiat ullam voluptates
        fuga. Beatae aperiam pariatur ipsam in ea! Molestias maiores ex veniam.
      </Typography>
      <Typography variant="body2" component="h1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. In ut maxime
        aliquam et illum ipsam odio, iure, earum minus rerum aliquid placeat,
        eaque a qui magni totam incidunt. Atque, quidem.
      </Typography>
    </div>
  )
}

export default MuiTypography
