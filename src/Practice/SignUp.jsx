import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import styles from "./SignUp.module.css"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"

import { useFormik } from "formik"
import { basicSchema } from "../components/schemas"
// import { useRecoilState } from "recoil"
// import { darkModeState } from "../components/utils/globelState"

const SignUp = () => {
  // const [isDarkModeEnabled, setIsDarkModeEnable] = useRecoilState(darkModeState)

  const { errors, handleSubmit, handleChange, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values)
      },
      validationSchema: basicSchema,
    })

  return (
    <Box className={styles.container}>
      <Stack spacing={4} className={styles.wrapper}>
        <Typography variant="h3" color="secondary">
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            id="name"
            name="name"
            placeholder="Enter your Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name ? (
            <p className={styles.error_message}>{errors.name}</p>
          ) : null}
          <TextField
            label="Email id"
            id="email"
            name="email"
            placeholder="Enter your Email ID"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <p className={styles.error_message}>{errors.email}</p>
          ) : null}
          <TextField
            label="password"
            name="password"
            id="password"
            type="password"
            placeholder="**************"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password ? (
            <p className={styles.error_message}>{errors.password}</p>
          ) : null}

          <Button
            className={styles.button}
            variant="contained"
            size="medium"
            type="submit"
            endIcon={
              <PersonAddAltIcon fontSize="inherit" style={{ fontSize: "30" }} />
            }
          >
            Sign Up
          </Button>
        </form>
      </Stack>
    </Box>
  )
}

export default SignUp
