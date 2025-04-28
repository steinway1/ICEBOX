module.exports = {
  plugins: ["@zackad/prettier-plugin-twig"],
  twigPrintWidth: 999,
  overrides: [
    {
      files: "*.js",
      options: {
        printWidth: 200,
      },
    },
    {
      files: "*.twig",
      options: {
        tabWidth: 2, // Размер отступа
        useTabs: false,
        printWidth: 680,
        trailingComma: "all",
      },
    },
  ],
};
