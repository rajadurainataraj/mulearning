/* eslint-disable react/jsx-no-undef */
import { useRecoilValue } from "recoil";
import SignUp from "./Practice/SignUp";
import { darkModeState } from "./components/utils/globelState";
import { ThemeProvider, createTheme } from "@mui/material";
import DrawerAppBar from "./components/DrawerAppBar";
import Table from "./components/Table";
import FullFeaturedCrudGrid from "./components/FullFeaturedCrudGrid";
import ColumnSelection from "./components/ColumnSelection";

const App = () => {
  const isDark = useRecoilValue(darkModeState);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const toggle = isDark && darkTheme;
  return (
    <>
      <ThemeProvider theme={toggle}>
        <DrawerAppBar />
        {/* <FullFeaturedCrudGrid /> */}
        <ColumnSelection />
      </ThemeProvider>
    </>
  );
};

export default App;
