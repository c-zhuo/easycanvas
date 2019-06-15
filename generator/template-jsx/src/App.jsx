import { Painter } from 'easycanvas';
import ComponentHelloWorld from './ComponentHelloworld.jsx';
import ComponentWordG from './ComponentLertterG.jsx';

const $App = new Painter();
$App.register(document.getElementById('app'), {
    fullScreen: true,
    dpr: 2
});
$App.start();

$App.add(<ComponentHelloWorld width={$App.width} />);
$App.add(<ComponentWordG onclick={() => {
    $App.clear();
}}/>);
