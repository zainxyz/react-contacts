module.exports = {
  "extends": "eslint-config-react-xyz",
  "globals": {
    "document": true,
    "window": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "react/forbid-prop-types": "off"
  }
};
