module.exports = {
  plugins: ["@zackad/prettier-plugin-twig"],
  twigPrintWidth: 999,
  overrides: [
    {
      files: "*.js",
      options: {
        printWidth: 120,
        semi: true,
        singleQuote: true,
        trailingComma: "all",
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "lf",
        tabWidth: 2,
        useTabs: false,
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
