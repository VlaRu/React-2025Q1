module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'init', 'docs', 'refactor']],
    'header-max-length': [2, 'always', 50]
  }
};
