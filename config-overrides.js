const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#35b784',
      '@border-radius-base': '0',
      '@border-radius-sm': '0'
    }
  }),
  addDecoratorsLegacy()
)
