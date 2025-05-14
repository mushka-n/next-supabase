// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/api/(.*)$',
    '^@/common/(.*)$',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/stores/(.*)$',
    '^@/styles/(.*)$',
    '^[./]',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
};
