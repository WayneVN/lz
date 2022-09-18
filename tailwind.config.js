module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "2xl": "0 0 14px 0 rgba(133,137,143,0.40)",
        "3xl": " 0 0 20px 0 rgba(187,191,196,0.30)",
      },
    },
    screens: {
      mobile: { max: "750px" },
      desktop: { min: "1024px" },
    },
  },
  plugins: [],
};
