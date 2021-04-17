import { clipperLib, clipperOffset, clipperUnite } from 'paper-clipper'
import * as paper from 'paper';

class App {
    scope: paper.PaperScope;
    root: paper.Layer;
    canvas: HTMLCanvasElement;
    canvas_width = 600;
    canvas_height = 600;
    paper_import;
    paper: paper.PaperScope;
    zoom = 1;
    clipper_import;
    clipper;

    constructor() {
        this.paper_import = import('paper');
        this.paper_import.then((p) => {
            this.paper = p;

            this.setupCanvas();
        })
        this.clipper_import = clipperLib.loadNativeClipperLibInstanceAsync(
          clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
        );
        this.clipper_import.then((clipper) => {
            this.clipper = clipper;
        });
    }

    setupCanvas() {
        this.canvas = document.getElementById('paper-canvas') as HTMLCanvasElement;
        this.canvas.style.width = `${this.canvas_width}`;
        this.canvas.style.height = `${this.canvas_height}`;

        this.scope = new this.paper.PaperScope();
        this.scope.activate();
        this.scope.setup(this.canvas);

        this.scope.tool = new this.paper.Tool();

        this.root = new this.paper.Layer();
        this.root.onFrame = this.onFrame.bind(this);

        this.test();
    }

    onFrame() {
        this.scope.view.center = new this.paper.Point(this.canvas_width/2, this.canvas_height/2);
        this.scope.view.viewSize = new this.paper.Size(this.canvas_width, this.canvas_height);
        this.scope.view.zoom = this.zoom;
    }

    async test() {
        let circle = new this.paper.Path.Circle(new this.paper.Point(100, 100), 40);
        circle.fillColor = new this.paper.Color('red');
        circle.strokeColor = new this.paper.Color('black');
        circle.strokeWidth = 2;

        await this.clipper_import;
        const unitedPaths = await clipperUnite(this.clipper)([circle]);

        let merged = unitedPaths[0];
        merged.strokeWidth = 2;
        merged.strokeColor = new this.paper.Color('blue');
        merged.fillColor = new this.paper.Color('green');
    }
}

const app = new App();

// For debugging
window['app'] = app;