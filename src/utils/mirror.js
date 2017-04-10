module.exports = function mirrorImage (orgImage) {  
  
    var imageWidth = orgImage.width;  
    var imageHeight = orgImage.height;  
  
    var tempCanvas = document.createElement('canvas');  
    tempCanvas.width = imageWidth;  
    tempCanvas.height = imageHeight;  
  
    var context = tempCanvas.getContext("2d");  
    context.scale(1, -1);  
    context.translate(0, -imageHeight);  
    context.drawImage(orgImage, 0, 0);  
    var flipImage = context.getImageData(0, 0, imageWidth, imageHeight);  
  
    return {
        canvas: context,
        img: flipImage
    };
};
