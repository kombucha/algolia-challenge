import defaultTheme from "react-chips/lib/theme";

const myTheme = {
  ...defaultTheme,
  chipsContainer: {
    ...defaultTheme.chipsContainer,
    width: "50%",
    borderRadius: 0,
  },
};

export default myTheme;
