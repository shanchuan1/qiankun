<p align="center">
  <a href="https://qiankun.umijs.org">
    <img src="https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png" alt="qiankun" width="180" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/qiankun"><img src="https://img.shields.io/npm/v/qiankun.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://codecov.io/gh/umijs/qiankun"><img src="https://img.shields.io/codecov/c/github/umijs/qiankun.svg?style=flat-square" alt="coverage" /></a>
  <a href="https://www.npmjs.com/package/qiankun"><img src="https://img.shields.io/npm/dt/qiankun.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/umijs/qiankun/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/umijs/qiankun/ci.yml?branch=master&style=flat-square" alt="build status" /></a>
  <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue" alt="dumi" /></a>
</p>

# qiankun（乾坤）

> In Chinese, `qian(乾)` means heaven and `kun(坤)` earth. `qiankun` is the universe.

Qiankun enables you and your teams to build next-generation and enterprise-ready web applications leveraging [Micro Frontends](https://micro-frontends.org/). It is inspired by and based on [single-spa](https://github.com/CanopyTax/single-spa).

## 🤔 Motivation

A quick recap about the concept of `Micro Frontends`: 简要回顾一下“微型前端”的概念：

> Techniques, strategies and recipes for building a **modern web app** with **multiple teams** using **different JavaScript frameworks**. — [Micro Frontends](https://micro-frontends.org/) 与**多个团队**使用**不同的 JavaScript 框架**构建**现代 web 应用程序**的技术、策略和配方。——[微型前端](https://micro-frontends.org/)

Qiankun was birthed internally in our group during the time web app development by distributed teams had turned to complete chaos. We faced every problem micro frontend was conceived to solve, so naturally, it became part of our solution. 乾坤诞生于我们团队内部，当时分布式团队的网络应用程序开发已经完全混乱。我们面临着微前端所要解决的每一个问题，所以很自然，它成为了我们解决方案的一部分。

The path was never easy, we stepped on every challenge there could possibly be. Just to name a few: 这条路从来都不容易，我们迎接了可能出现的每一个挑战。仅举几个例子：

- In what form do micro-apps publish static resources? -微应用程序以何种形式发布静态资源？

- How does the framework integrate individual micro-apps? -该框架如何集成单个微应用程序？

- How to ensure that sub-applications are isolated from one another (development independence and deployment independence) and runtime sandboxed? -如何确保子应用程序彼此隔离（独立于开发和部署），并在运行时使用沙盒？

- Performance issues? What about public dependencies? -性能问题？公共依赖关系如何？

- The list goes on long ... -名单很长。。。

After solving these common problems of micro frontends and lots of polishing and testing, we extracted the minimal viable framework of our solution, and named it `qiankun`, as it can contain and serve anything. Not long after, it became the cornerstone of hundreds of our web applications in production, and we decided to open-source it to save you the suffering. 在解决了这些常见的微前端问题和大量的抛光和测试之后，我们提取了解决方案的最小可行框架，并将其命名为“乾坤”，因为它可以包含和服务任何东西。不久之后，它成为我们数百个正在生产的 web 应用程序的基石，我们决定将其开源，以减轻您的痛苦。 **TLDR: Qiankun is probably the most complete micro-frontend solution you ever met🧐.** TLDR:乾坤可能是您见过的最完整的微前端解决方案

## :sparkles: Features

Qiankun inherits many benefits from [single-spa](https://github.com/CanopyTax/single-spa):

- 📦 **Micro-apps Independent Deployment**
- 🛴 **Lazy Load**
- 📱 **Technology Agnostic**

And on top of these, it offers:

- 💃 **Elegant API**
- 💪 **HTML Entry Access Mode**
- 🛡 **Style Isolation**
- 🧳 **JS Sandbox**
- ⚡ **Prefetch Assets**
- 🔌 **[Umi Plugin](https://github.com/umijs/plugins/tree/master/packages/plugin-qiankun) Integration**

## 📦 Installation

```shell
$ yarn add qiankun  # or npm i qiankun
```

## 📖 Documentation

You can find the Qiankun documentation [on the website](https://qiankun.umijs.org/) 您可以在网站上找到乾坤文档

Check out the [Getting Started](https://qiankun.umijs.org/guide/getting-started) page for a quick overview. 查看“快速入门”页面以获取快速概述。

The documentation is divided into several sections: 文件分为几个部分：

- [Tutorial](https://qiankun.umijs.org/cookbook)
- [API Reference](https://qiankun.umijs.org/api)
- [FAQ](https://qiankun.umijs.org/faq)
- [Community](https://qiankun.umijs.org/#-community)

## 💿 Examples

Inside the `examples` folder, there is a sample Shell app and multiple mounted Micro FE apps. To get it running, first clone `qiankun`:

```shell
$ git clone https://github.com/umijs/qiankun.git
$ cd qiankun
```

Now install and run the example:

```shell
$ yarn install
$ yarn examples:install
$ yarn examples:start
```

Visit `http://localhost:7099`.

![](./examples/example.gif)

## 🎯 Roadmap

See [Qiankun 3.0 Roadmap](https://github.com/umijs/qiankun/discussions/1378)

## 👥 Contributors

Thanks to all the contributors!

<a href="https://github.com/umijs/qiankun/graphs/contributors">
  <img src="https://opencollective.com/qiankun/contributors.svg?width=960&button=false" alt="contributors" />
</a>

## 🎁 Acknowledgements

- [single-spa](https://github.com/CanopyTax/single-spa) What an awesome meta-framework for micro-frontends!
- [import-html-entry](https://github.com/kuitos/import-html-entry/) An assets loader that supports html entry.

## 📄 License

Qiankun is [MIT licensed](./LICENSE).
