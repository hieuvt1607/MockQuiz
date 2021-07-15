module.exports = {
  root: true,
  globals: {
    _: true,
    Bus: true,
    Vue: true,
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-console': 'off',
    'vue/html-indent': 'off',
    indent: 'off',
    camelcase: ['error'],
    'vue/max-attributes-per-line': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': [2, { 'props': false }],
    'no-unused-vars': [2, {'args': 'after-used', 'argsIgnorePattern': '^_'}],
    'no-underscore-dangle': ['error', { 'allow': ['_version'] }],
    'max-len': ['error', {code: 160}]
  },
  plugins: ['vue'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.vue']
      }
    }
  }
};
