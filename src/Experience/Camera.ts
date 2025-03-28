import { OrthographicCamera, PerspectiveCamera, Vector3 } from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
    experince !: Experience;
    public perspectiveCamera !: PerspectiveCamera;
    public orthographicCamera !: OrthographicCamera;
    public controls !: OrbitControls;

    cameraDefaultPos: Vector3 = new Vector3(2.5, 6, 52);
    cameraTarget: Vector3 = new Vector3(0,10,0);

    acctiveCamera !: PerspectiveCamera | OrthographicCamera ; 

    constructor() {
        this.experince = new Experience();
        this.init();
        // this.listenStats(); 
    }

    private init() {
        this.createPerspectiveCamera();
    }

    private createPerspectiveCamera() {
        this.perspectiveCamera = new PerspectiveCamera(75, this.experince.sizes.aspectRatio, 0.1, 1000);
        this.perspectiveCamera.position.copy(this.cameraDefaultPos);
        this.perspectiveCamera.rotation.y += .01 ; 
        this.controls = new OrbitControls(this.perspectiveCamera, this.experince.canvas);
        this.acctiveCamera = this.perspectiveCamera ; 
        this.controls.enabled = false ;
    }


    // listenStats() {
    //     this.controls.addEventListener('change', () => {
    //         const renderInfo = this.experince.renderer.instance.info.render;

    //         document.getElementById("drawcalls")!.textContent = renderInfo.calls.toString();
    //         document.getElementById("triangles")!.textContent = renderInfo.triangles.toString();
    //         document.getElementById("lines")!.textContent = renderInfo.lines.toString();
    //         document.getElementById("points")!.textContent = renderInfo.points.toString();
    //     });
    // }

    update() {
        this.controls.update();
    }

    keydown(e: KeyboardEvent) {
        if (e.code == "Numpad0") {
            this.perspectiveCamera.position.copy(this.cameraDefaultPos);
            this.controls.target.copy(this.cameraTarget);
        }
        if( e.code == 'KeyP'){
            this.acctiveCamera = this.perspectiveCamera ; 
        }
        if( e.code == 'KeyO'){
            this.acctiveCamera = this.orthographicCamera ; 
        }
    }

    resize() {
        this.perspectiveCamera.aspect = this.experince.sizes.aspectRatio;
        this.perspectiveCamera.updateProjectionMatrix();
    }
}