const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  views: path.join(__dirname, 'src', 'views'),
  styles: path.join(__dirname, 'src', 'styles'),
  scripts: path.join(__dirname, 'src', 'scripts'),
};

const webpackConfig = {
  mode: 'production',
  entry: path.join(PATHS.scripts, 'main.js'),
  output: {
    path: PATHS.dist,
    filename: 'assets/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: PATHS.src,
        loaders: ['pug-loader'],
      },
      {
        test: /\.(scss)$/,
        include: PATHS.src,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@styles': PATHS.styles,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...viewTemplates(),
    new HtmlBeautifyPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};

function viewTemplates() {
  return glob.sync(`${PATHS.views}/*.pug`).map((file) => {
    const basename = path.basename(file);
    return new HtmlWebpackPlugin({
      filename: basename.replace(/\.[^/.]+$/, '.html'),
      template: path.join(PATHS.views, basename),
    });
  });
}

module.exports = webpackConfig;
