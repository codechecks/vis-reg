<p align="center">
  <h3 align="center">Visual Regression</h3>
  <p align="center">Visual Regression on GitHub</p>

  <p align="center">
    <a href="https://circleci.com/gh/codechecks/build-size-watcher"><img alt="Build Status" src="https://circleci.com/gh/codechecks/build-size-watcher/tree/master.svg?style=svg"></a>
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <a href="https://codechecks.io"><img src="https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true" alt="codechecks.io"></a>
  </p>
</p>

## Install

```sh
npm install --save-dev @codechecks/vis-reg
```

## Usage

Are you new to codechecks? Check out
[getting started guide (it's simple)](https://github.com/codechecks/docs/blob/master/getting-started.md)!

Add to your `codechecks.yml` file:

```yml
checks:
  - name: vis-reg
    options:
      collectionName: "E2E" # arbitrary name, for example: e2e, storybook
      imagesPath: "./images/" # path when current images are stored
  # ...
```

## API

## Contributing

All contributions are welcomed. Read more in [CONTRIBUTING.md](./CONTRIBUTING.md)

## Licence

MIT @ [codechecks.io](https://codechecks.io)
