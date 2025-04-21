module.exports = {
  plugins: ["@zackad/prettier-plugin-twig"],
  overrides: [
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
