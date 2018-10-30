if (process.env.NODE_ENV !== 'production') {
    module.exports = function () {
        let $canvas = this;

        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach((child) => {
            child.uncombine();
            child.$combine = true;
        });

        $canvas.paint();

        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach((child) => {
            child.$combine = false;
        });

        let sekeletonString = '';
        sekeletonString += "var $SKL=document.getElementsByTagName('canvas')[0];";
        sekeletonString += `$SKL.width=${$canvas.width};$SKL.height=${$canvas.height};`;
        sekeletonString += "$SKL.style.width='100%';$SKL.style.width='100%';";
        sekeletonString += "var SKLIMG=[];";
        sekeletonString += "var SKL = function(){";
        sekeletonString += "var _=$SKL.getContext('2d');";

        let $children = $canvas.$children;
        $children.forEach(($child) => {
            let props = $child.props;
            let settings = $child.settings;


            if ($child.type === 'img') {
                sekeletonString += `_.globalAlpha=${settings.globalAlpha};`;

                if ($child.img && $child.img.$origin) {
                    // is canvas
                    sekeletonString += $child.img.$origin.join(';') + ';';
                    sekeletonString += `_.drawImage(tempCanvas, ${props.sx}, ${props.sy}, ${props.sw}, ${props.sh}, ${props.tx}, ${props.ty}, ${props.tw}, ${props.th});`;
                } else if ($child.img && $child.img.src) {
                    sekeletonString += `var img = new Image();`;
                    sekeletonString += `var imgUrl='${$child.img.src}';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};`;
                    sekeletonString += `img.src=imgUrl;`;
                    sekeletonString += `_.drawImage(img, ${props.sx}, ${props.sy}, ${props.sw}, ${props.sh}, ${props.tx}, ${props.ty}, ${props.tw}, ${props.th});`;
                } else {
                    sekeletonString += `_.fillStyle='#666';`;
                    sekeletonString += `_.fillRect(${props.tx}, ${props.ty}, ${props.tw}, ${props.th});`;
                }
            } else if ($child.type === 'fillRect') {
                sekeletonString += `_.globalAlpha=${settings.globalAlpha};`;

                sekeletonString += `_.fillStyle='${settings.fillRect}';`;
                sekeletonString += `_.fillRect(${props.tx}, ${props.ty}, ${props.tw}, ${props.th});`;
            }
        });

        sekeletonString += `_.globalAlpha=1;`;
        sekeletonString += '};SKL($SKL);'

        console.log(sekeletonString);
    };
}