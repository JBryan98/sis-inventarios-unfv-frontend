import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { esES } from "@mui/material/locale"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme(
  {
    palette: {
      mode: "light",
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "info" && {
              backgroundColor: "#60a5fa",
            }),
          }),
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            paddingBlockStart: "4px",
            paddingBlockEnd: "4px",
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            paddingBlockStart: "4px",
            paddingBlockEnd: "4px",
          },
        },
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          root: {
            paddingBlockStart: "16px",
            paddingBlockEnd: "16px",
            paddingInlineStart: "16px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            paddingBlockStart: "10px",
            paddingBlockEnd: "10px",  
          }
        },
      },
    },
  },
  esES
);

export default theme;