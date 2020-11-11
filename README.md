# vue-cli-plugin-feathers-vuex

[![Known Vulnerabilities](https://snyk.io/test/github/fratzinger/vue-cli-plugin-feathers-vuex/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fratzinger/vue-cli-plugin-feathers-vuex?targetFile=package.json)
[![Dependency Status](https://david-dm.org/fratzinger/vue-cli-plugin-feathers-vuex.svg)](https://david-dm.org/fratzinger/vue-cli-plugin-feathers-vuex)
![NPM](https://img.shields.io/npm/l/vue-cli-plugin-feathers-vuex)
![npm](https://img.shields.io/npm/v/vue-cli-plugin-feathers-vuex)
![npm](https://img.shields.io/npm/dm/vue-cli-plugin-feathers-vuex)

Vue Cli Plugin for initialising [feathers-vuex](https://github.com/feathers-plus/feathers-vuex) and adding services. For feathers-vuex `v3.0.0` and ongoing

<div align="center">
    <img src="https://github.com/feathers-plus/feathers-vuex/raw/master/service-logo.png" />
</div>

> Integrate feathers-vuex into vue automatically

## Installation
If you use Vue cli, type the following in your command line:
```
vue add feathers-vuex
```

## Usage
- `vue add feathers-vuex` - init feathers-vuex
- `vue invoke feathers-vuex` 
  - `add service` - adds a new service with the baked in template
  - `copy template to feathers folder` - you can customize your own template and use it for new service creation. It will be placed under: `./src/store/feathers/templates/${templateName}` and will be invoked as following:
  - `add service from custom template` - this renders all files from your custom template folder to your application. You can customize the files with [ejs](https://ejs.co/#docs)
  - `init feathers-vuex` - this is the same as `vue add feathers-vuex`

## Features
- Add feathers-vuex regarding [best practice](https://feathers-vuex.netlify.app/getting-started.html)
- add new services
- Currently supporting Javascript

## ToDo
- [ ] Support Typescript

## License

This project is licensed under the MIT License - see the [license file](./LICENSE) for details
