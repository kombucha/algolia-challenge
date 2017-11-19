import defaultTheme from "react-chips/lib/theme";

// I have to customize the input that way, the library uses radium and doesn't take classes...
const myTheme = {
  ...defaultTheme,
  chipsContainer: {
    ...defaultTheme.chipsContainer,
    width: "50%",
    borderRadius: "4px",
  },
};

export default myTheme;
