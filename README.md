## 什么是微前端？

微前端（Micro-Frontends）是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用还可以独立运行、独立开发、独立部署。**微前端不是单纯的前端框架或者工具，而是一套架构体系**，这个概念最早在 2016 年底被提出，可以参考在 Google 上搜索 Micro-Frontends, 排名靠前的[micro-frontends.org 的博客文章，提出了早期的微前端模型。](https://micro-frontends.org的博客文章，提出了早期的微前端模型。)

## 为什么会有微前端

任何新技术的产生都是为了解决现有场景和需求下的技术痛点，微前端也不例外：

1. **拆分和细化**：当下前端领域，单页面应用（SPA）是非常流行的项目形态之一，而随着时间的推移以及应用功能的丰富，单页应用变得不再单一而是越来越庞大也越来越难以维护，往往是改一处而动全身，由此带来的发版成本也越来越高。微前端的意义就是将这些庞大应用进行拆分，并随之解耦，每个部分可以单独进行维护和部署，提升效率。
2. **整合历史系统**：在不少的业务中，或多或少会存在一些历史项目，这些项目大多以采用老框架类似（Backbone.js，Angular.js 1）的 B 端管理系统为主，介于日常运营，这些系统需要结合到新框架中来使用还不能抛弃，对此我们也没有理由浪费时间和精力重写旧的逻辑。而微前端可以将这些系统进行整合，在基本不修改来逻辑的同时来同时兼容新老两套系统并行运行。

## 实现微前端有哪些方案

单纯根据对概念的理解，很容易想到实现微前端的重要思想就是将应用进行拆解和整合，通常是一个父应用加上一些子应用，那么使用类似 Nginx 配置不同应用的转发，或是采用 iframe 来将多个应用整合到一起等等这些其实都属于微前端的实现方案，他们之间的对比如下图：

| 方案               | 描述                                                                                                | 优点                                               | 缺点                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Nginx 路由转发     | 通过 Nginx 配置反向代理来实现不同路径映射到不同应用，例如                                           | 简单，快速，易配置                                 | 在切换应用时会触发浏览器刷新，影响体验                                                                 |
| iframe 嵌套        | 父应用单独是一个页面，每个子应用嵌套一个 iframe，父子通信可采用 postMessage 或者 contentWindow 方式 | 实现简单，子应用之间自带沙箱，天然隔离，互不影响   | iframe 的样式显示、兼容性等都具有局限性；太过简单而显得 low                                            |
| Web Components     | 每个子应用需要采用纯 Web Components 技术编写组件，是一套全新的开发模式                              | 每个子应用拥有独立的 script 和 css，也可单独部署   | 对于历史系统改造成本高，子应用通信较为复杂易踩坑                                                       |
| 组合式应用路由分发 | 每个子应用独立构建和部署，运行时由父应用来进行路由管理，应用加载，启动，卸载，以及通信机制          | 纯前端改造，体验良好，可无感知切换，子应用相互隔离 | 需要设计和开发，由于父子应用处于同一页面运行，需要解决子应用的样式冲突，变量对象污染，通信机制等技术点 |

上述方案中，每种都有自己的优劣，最原始的 Nginx 配置反向代理是从接入层的角度来将系统进行分离，但是需要运维配置，而 iframe 嵌套是最简单和最快速的方案，但是 iframe 的弊端也是无法避免的，而 Web Components 的方案则需要大量的改造成本，最后的组合式应用路由分发方案改造成本中等并且能满足大部分需求，也不影响各前端应用的体验，是当下各个业务普遍采用的一种方案，本文后面的内容也是主要基于这种方案进行阐述。

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
