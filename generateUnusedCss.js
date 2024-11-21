// generateUnusedCss.js
const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const postcss = require('postcss');

(async () => {
  // Запускаем PurgeCSS с настройками из конфигурационного файла
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ["./dev/*.html"],
    css: ["./dev/css/partial.css"],
    rejected: true
  });

  // Получаем список удалённых селекторов
  const rejectedSelectors = purgeCSSResults[0].rejected;

  if (rejectedSelectors.length === 0) {
    console.log('Нет неиспользуемых селекторов для сохранения.');
    return;
  }

  // Читаем исходный CSS
  const originalCss = fs.readFileSync('./dev/css/partial.css', 'utf-8');

  // Парсим CSS с помощью PostCSS
  const root = postcss.parse(originalCss);

  let unusedCss = '';

  // Проходим по всем правилам CSS
  root.walkRules(rule => {
    const selectors = rule.selector.split(',').map(s => s.trim());
    const unusedSelectors = selectors.filter(s => rejectedSelectors.includes(s));

    if (unusedSelectors.length > 0) {
      // Добавляем только неиспользуемые селекторы
      unusedCss += `${unusedSelectors.join(', ')} {\n`;
      rule.walkDecls(decl => {
        unusedCss += `  ${decl.prop}: ${decl.value};\n`;
      });
      unusedCss += '}\n\n';
    }
  });

  // Сохраняем результат в отдельный файл
  fs.mkdirSync('./unused/', { recursive: true });
  fs.writeFileSync('./unused/unused.css', unusedCss, 'utf-8');

  console.log('Файл с неиспользуемыми селекторами сохранён в ./unused/unused.css');
})();
