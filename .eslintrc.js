module.exports = {
  "extends": ["airbnb-base", "plugin:jest/recommended"],
  "plugins": ["jest"],
  "env": {
    "node": true,
    "jest": true
  },
  "rules": {
    "import/prefer-default-export": "off"
  }
};
