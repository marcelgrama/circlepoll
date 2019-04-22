export default {
  webpack: config => ({
    target: 'node',
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    ...config
  })
};
