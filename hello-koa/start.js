/**
 * Created by benben on 17/2/17.
 */
// Babel是一个JavaScript编写的转码器，
// 它可以把高版本的JavaScript代码转换成低版本的JavaScript代码，
// 并保持逻辑不变
// 先加载babel-core/register，再加载app.js
var register = require('babel-core/register');

register({
    presets: ['stage-3']
});

require('./app.js');