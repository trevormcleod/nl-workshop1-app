
module.exports = function strencode( data ) {
  return unescape( encodeURIComponent( JSON.stringify( data ) ) );
}