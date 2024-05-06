# 一个简单的服务端项目

基于 koa，封装了一些常用的功能，如：路由，数据库连接等，下载即用，快速开发

# 一、核心代码 lib/core

## 1.hooks

封装基本的功能，可选

### bodyparser

解析请求体，方便处理 post,put 等请求

### cors

处理跨域，设置一些请求头

### custom-middlewares

处理自定义中间件

### lift

启动服务

### log

日志处理

### login

处理登录

### mysql

连接到数据库

### router

处理请求路由，router 值为 file 时，做文件路由处理

### static

处理 static 目录静态资源

### view.ts

处理 view 目录下的模板引擎，一般为错误提示页

## 2.types

类型定义

## 3. utils

工具方法

## 二、使用 example

### 1.config

配置不同环境下的 hooks

### 2. log

日志输出目录

### 3. middleware

自定义中间件

### 4. routers

路由

### 5. static

静态资源

### 6. view

模板引擎
