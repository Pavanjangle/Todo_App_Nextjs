import { MantineThemeOverride } from "@mantine/core";

const customTheme: MantineThemeOverride = {
  colors: {
    primary: [
      "#E0F2F1",
      "#B2DFDB",
      "#80CBC4",
      "#4DB6AC",
      "#26A69A",
      "#009688",
      "#00897B",
      "#00796B",
      "#00695C",
      "#004D40",
    ],
    secondary: [
      "#FFEBEE",
      "#FFCDD2",
      "#EF9A9A",
      "#E57373",
      "#EF5350",
      "#F44336",
      "#E53935",
      "#D32F2F",
      "#C62828",
      "#B71C1C",
    ],
  },
  fontFamily: "Arial, sans-serif",
  primaryColor: "primary",
  components: {
    Button: {
      defaultProps: {
        size: "md",
        radius: "md",
      },
    },
  },
};

export default customTheme;
