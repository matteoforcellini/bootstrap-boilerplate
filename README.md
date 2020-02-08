# Bootstrap Boilerplate

Boilerplate (skeleton) used to quickly building bootstrap templates.

## Whats included

- [Bootstrap 4](https://getbootstrap.com/) - CSS Framework.
- [Pug](https://pugjs.org/api/getting-started.html) - Template Language.
- [SCSS](https://sass-lang.com/) - Style Language.
- [Webpack](https://webpack.js.org/) - Bundler.

## File Structure

```
project
│   package.json
│   webpack.config.js
│   README.md
│   LICENSE
│
└───src
│   │
│   └───views
│       │   index.pug
│       │   about.pug
│       └───includes
│       │      _config.pug
│       │      _layout.pug
│       │      _header.pug
│       │      _footer.pug
│       │
│       styles
│       │   main.scss
│       └───partials
│       │      _bootstrap-overrides.scss
│       │
│       scripts
│       │   main.js
│       ...
```

## How to use

- Clone this repo.

  - `$ git clone https://github.com/AhmedMKamal/bootstrap-boilerplate.git`

- Install dependincies.

  - `$ npm install`

- Modify source (pug, scss, js) files.

- Creating an optimized production build.

  - `$ npm run build`
