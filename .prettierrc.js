module.exports = {
  plugins: ["@zackad/prettier-plugin-twig"],
  overrides: [
    {
      files: "*.js",
      options: {
        printWidth: 580,
      },
    },
    {
      files: "*.twig",
      options: {
        tabWidth: 2, // Размер отступа
        useTabs: false,
        printWidth: 280,
      },
    },
  ],
};
