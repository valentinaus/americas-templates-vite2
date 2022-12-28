import { extendTheme } from "@chakra-ui/react";
import "../styles/styles.css";

const theme = extendTheme({
    colors: {
        brand: {
            primary: {
                mediumLight: "#EFF5FF",
                light: "#D6E0EF",
                medium: "#85A4D9",
                dark: "#3E69B1",
                hover: "#2d4e85",
                active: "#1e3860",
                inputs: "#3D609E",
            },
            gray: {
                XLlight: "#FDFDFD",
                extraLight: "#F7F7F7",
                superLight: "#E2E8F0",
                light: "#CACACA",
                mediumLight: "#AFAFAF",
                dark: "#898989",
                medium: "#6C6C6C",
                superDark: "#4E4E4E",
            },

            red: {
                superLight: "#FFE9E9",
                light: "#FFD6D6",
                medium: "#F55555",
            },
        },
    },
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
});

export default theme;
