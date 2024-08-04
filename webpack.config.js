module.exports = function (options, webpack) {
  const lazyImports = [
    '@nestjs/microservices',
    '@nestjs/websockets/socket-module',
    '@nestjs/platform-socket.io',
    'amqp-connection-manager',
    'amqplib',
    'ioredis',
    'nats',
    'mqtt',
    'kafkajs',
  ];

  return {
    ...options,
    entry: './dist/src/main-lambda.js',
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
