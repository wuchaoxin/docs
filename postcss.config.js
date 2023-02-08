module.exports = () => {
  return {
    plugins: {
      // 选用 postcss-px-to-viewport 的变种包，是因为原版作者忘记在 npm 上发布最新的包（详情见原仓库 issue）
      '@our-patches/postcss-px-to-viewport': {
        // 要转化的单位
        unitToConvert: 'px',
        // UI设计稿的宽度
        viewportWidth: 375,
        // UI设计稿的高度
        // viewportHeight: 667,
        // 转换后的精度，即小数点位数
        unitPrecision: 6,
        // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        propList: ['*'],
        // 指定需要转换成的视窗单位，默认vw
        viewportUnit: 'vw',
        // 指定字体需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw',
        // 指定不转换为视窗单位的类名（avoid-container 为标准）
        selectorBlackList: ['iframe-container', 'avoid-container'],
        // 默认值1，小于或等于1px则不进行转换
        minPixelValue: 1,
        // 是否在媒体查询的css代码中也进行转换，默认false
        mediaQuery: true,
        // 是否转换后直接更换属性值
        replace: true,
        // 只识别这个目录
        include: [/\/components\/Mobile\/examples\//],
        // 设置忽略文件，用正则做目录名匹配
        // exclude: [/node_modules/, /^((?!examples)\w)+$/],
        // 是否处理横屏情况
        landscape: false,
      },
    },
  }
}
