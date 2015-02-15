module.exports.stringToArray = function (row) {
  return row.split('');
};

module.exports.arrayToString = function (row) {
  return row.join('');
};

module.exports.blit = function (srcArr, destArr, xOffset, yOffset) {
  var i, j;

  var height = srcArr.length,
      width = srcArr[0].length;

  var destHeight = destArr.length,
      destWidth = destArr[0].length;

  for (i = 0; i < height && i + yOffset < destHeight; i++) {
    for (j = 0; j < width && j + xOffset < destWidth; j++) {
      destArr[yOffset + i][xOffset + j] = srcArr[i][j];
    }
  }

  return destArr;
};

