const zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');

function GZipPlugin (options) {

}

GZipPlugin.prototype.apply = compiler => {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback) => {

      zlib.gzip(htmlPluginData.html.source(), (err, buffer) => {
        if (!err) {
          fs.writeFile(htmlPluginData.outputName + '.gz', buffer, (err) => {
            if (err) throw err;
          })
        }
      });

      callback(null, htmlPluginData);
    })
  })
}

module.exports = GZipPlugin;
