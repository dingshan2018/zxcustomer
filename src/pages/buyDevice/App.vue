<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view name="main"/>
    </keep-alive>
    <router-view name="mainSub"/>
  </div>
</template>
