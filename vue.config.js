module.exports = {
  css:{
    loaderOptions:{
      scss:{
        prependData:`@import "@/asset/scss/color.scss";`
      }
    }
  }
}