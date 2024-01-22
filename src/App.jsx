import { useRecoilValue } from "recoil"
import SignUp from "./Practice/SignUp"
import { darkModeState } from "./components/utils/globelState"
import { ThemeProvider, createTheme } from "@mui/material"
import DrawerAppBar from "./components/DrawerAppBar"

const App = () => {
  const isDark = useRecoilValue(darkModeState)
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })
  const toggle = isDark && darkTheme
  return (
    <>
      <ThemeProvider theme={toggle}>
        <DrawerAppBar />
        <SignUp />
      </ThemeProvider>
    </>
  )
}

export default App
