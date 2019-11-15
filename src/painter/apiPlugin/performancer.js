const Performancer = function () {
    this.collect = ($app) => {
        let originCost = this.once($app);
        // console.warn(originCost);

        $app.children.forEach(($child) => {
            let _visible = $child.style.visible;

            $child.style.visible = false;

            let childCost = Math.max(originCost - this.once($app), 0);
            let childCostPercent = childCost / originCost;

            console.warn($child.name, Number(childCostPercent * 100).toFixed(2) + '%');

            $child.style.visible = _visible;
        });
    };

    this.once = ($app) => {
        let cur = Date.now();
        let runTime = 0;

        let $canvas = $app.paint ? $app : $app.$canvas;

        while (Date.now() < cur + 500) {
            for (var i = 0; i < 5; i++) {
                $canvas.paint();
            }

            runTime += 5;
        }

        let timeCost = Date.now() - cur;

        return timeCost / runTime;
    };
};

P = new Performancer();

export default new Performancer();
