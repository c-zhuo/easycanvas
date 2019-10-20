export default `
    <article id="静态容器StaticView">
        <h1>静态容器StaticView</h1>

        <p>StaticView组件会将内部的全部子节点（包含子节点的子节点）的渲染结果进行组合并缓存，以提升渲染效率。因此，其适用场景为各个子节点的位置相对容器不会频繁变化，并且子节点样式也不频繁变化的情况。当变化发生时，容器会等待各个子节点的连续两帧的内容完全相同之后，重新生成渲染缓存。</p>

        <p>不建议在这个组件自身挂载文本和图像内容，而应该放在子节点中。并且使用时建议为组件定义宽高。</p>

        <p class="tip">任何一个子节点的样式变化都会导致整个容器重新渲染，但如果这些子节点同时改变样式，那么只会重新渲染一次。因此，像“日历”这种场景下使用StaticView会大幅提升性能：子节点数量较多、通常不改变样式（一般当用户交互时才会出现样式变化，并且大量子节点会同时改变样式）。</p>

        <p>这个组件不会影响事件的触发。</p>

        <h2>示例</h2>

        <p>以下是一个使用JSX写法的例子。可以看到，在StaticView内增加了5000个子节点，这些子节点跟随StaticView一起左右移动，仍然可以保持流畅的60FPS。这是因为每个子节点相对于StaticView的位置是固定的，其渲染结果会被缓存下来。如果将StaticView改为普通的View或者Sprite基类，那么Chrome下的FPS一般会降到30以下。</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, StaticView, Image } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                const $static = $app.add(
                    <StaticView
                        style={{
                            left: Easycanvas.Transition.pendulum(0, 200, 5000).loop(),
                            top: 0,
                        }}
                    />
                );

                const imgUrl = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                $app.imgLoader(imgUrl, function (img) {
                    for (let i = 0; i < 5000; i++) {
                        $static.add(<Image
                            src={img}
                            style={{
                                left: Math.random() * 400,
                                top: Math.random() * 400,
                                width: Math.random() * 200,
                                height: Math.random() * 200,
                                zIndex: Math.random(),
                            }}
                            events={{
                                click () {
                                    alert(this.style.zIndex);
                                }
                            }}
                        />);
                    }
                });
            </code>
        </section>

        <h2>API</h2>

        <p>StaticView继承至Sprite基类，其作用仅是性能优化，因此不额外提供其它API。</p>

    </article>
`;
