export default function () {
    if (process.env.NODE_ENV !== 'production') {
        let $canvas = this;

        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach((child) => {
            child.uncombine();
            child.$combine = true;
        });

        $canvas.paint();

        $canvas.children[0].__proto__.getAllChildren.call($canvas).forEach((child) => {
            child.$combine = false;
        });

        let skeletonString = '';
        skeletonString += "var $SKL=document.getElementsByTagName('canvas')[0];";
        skeletonString += `$SKL.width=${$canvas.width};$SKL.height=${$canvas.height};`;
        skeletonString += "$SKL.style.width='100%';$SKL.style.width='100%';";
        skeletonString += "var SKLIMG=[];";
        skeletonString += "var SKL = function(){";
        skeletonString += "var _=$SKL.getContext('2d');";

        let $children = $canvas.$children;
        $children.forEach(($child) => {
            let props = $child.props;
            let settings = $child.settings;


            if ($child.type === 'img') {
                skeletonString += `_.globalAlpha=${settings.globalAlpha};`;

                if ($child.img && $child.img.$origin) {
                    // is canvas
                    skeletonString += $child.img.$origin.join(';') + ';';
                    skeletonString += `_.drawImage(tempCanvas, ${props.cutLeft}, ${props.cutTop}, ${props.cutWidth}, ${props.cutHeight}, ${props.left}, ${props.top}, ${props.width}, ${props.height});`;
                } else if ($child.img && $child.img.src) {
                    skeletonString += `var img = new Image();`;
                    skeletonString += `var imgUrl='${$child.img.src}';if(SKLIMG.indexOf(imgUrl)===-1){SKLIMG.push(imgUrl);img.onload=function(){_.clearRect(0,0,$SKL.width,$SKL.height);SKL();}};`;
                    skeletonString += `img.src=imgUrl;`;
                    skeletonString += `_.drawImage(img, ${props.cutLeft}, ${props.cutTop}, ${props.cutWidth}, ${props.cutHeight}, ${props.left}, ${props.top}, ${props.width}, ${props.height});`;
                } else {
                    skeletonString += `_.fillStyle='#666';`;
                    skeletonString += `_.fillRect(${props.left}, ${props.top}, ${props.width}, ${props.height});`;
                }
            } else if ($child.type === 'fillRect') {
                skeletonString += `_.globalAlpha=${settings.globalAlpha};`;

                skeletonString += `_.fillStyle='${settings.fillRect}';`;
                skeletonString += `_.fillRect(${props.left}, ${props.top}, ${props.width}, ${props.height});`;
            }
        });

        skeletonString += `_.globalAlpha=1;`;
        skeletonString += '};SKL($SKL);'

        console.log(skeletonString);
    }
};