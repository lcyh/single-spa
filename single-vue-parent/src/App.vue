<template>
  <div id="app">
    <el-menu
      :router="true"
      default-active="/vue"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/about">关于页</el-menu-item>
      <el-menu-item index="/vue">vue子应用</el-menu-item>
    </el-menu>
    <div id="vue"></div>
    <router-view />
  </div>
</template>

<style></style>
