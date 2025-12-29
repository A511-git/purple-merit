import withMT from "@material-tailwind/react/utils/withMT.js";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
