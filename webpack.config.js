module.exports =(env) => {
  return require(`./webpack.${env}.js`)
 }
require('dotenv').config();
 
 module.exports =(env) => {
  return require(`./webpack.${env}.js`)
 }