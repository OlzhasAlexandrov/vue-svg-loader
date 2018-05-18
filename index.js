const svgo = require("svgo")
const loaderUtils = require("loader-utils")
const compiler = require("vue-template-compiler")
const transpile = require("vue-template-es2015-compiler")

module.exports = function(content) {
  const options = loaderUtils.getOptions(this) || {}
  const svg = new svgo(options.svgo || {})
  const path = this.resourcePath

  this.cacheable && this.cacheable(true)
  this.addDependency(this.resourcePath)

  const cb = this.async()

  svg
    .optimize(content, { path: path })
    .then(result => {
      cb(null, result.data)
    })
    .catch(cb)
}
