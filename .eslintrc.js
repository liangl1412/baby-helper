module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "__DEV__": true
    },
    "rules": {
        "global-require": "off",
        "no-console": "off",
        "comma-dangle": "off",
        "import/first": "off",
        "import/no-named-as-default": "off",
        "import/prefer-default-export": "off",
        "import/no-dynamic-require": "off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/require-default-props":  "off",
        "react/jsx-boolean-value":  "off",
        "react/sort-comp":  "off",
        "react/no-unescaped-entities": ["error", {"forbid": [">","}"] }],
        "react/jsx-closing-bracket-location": "off",
        "spaced-comment": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "arrow-body-style": "off",
        "no-bitwise": "off",
        "no-plusplus": "off",
        "max-len": ["error", { "code": 180 }],
        "no-nested-ternary": "off",
        "operator-linebreak": ["error", "after"],
        "react/jsx-wrap-multilines": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/destructuring-assignment": "off",
        "no-underscore-dangle": "off",
        "linebreak-style": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "camelcase": "off",
        "react/forbid-prop-types": "off"
    }

};