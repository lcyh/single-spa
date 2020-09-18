<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home-子应用的首页</router-link> |
      <router-link to="/about">About-自用用的关于页</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  text-align: center;
}
</style>
