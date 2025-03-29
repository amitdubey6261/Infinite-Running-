import { OrthographicCamera, PerspectiveCamera, Vector3 } from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
    experince !: Experience;
    public perspectiveCamera !: PerspectiveCamera;
    public orthographicCamera !: OrthographicCamera;
    public controls !: OrbitControls;

    cameraDefaultPos: Vector3 = new Vector3(2.5, 6, 52);
    cameraTarget: Vector3 = new Vector3(0, 10, 0);

    acctiveCamera !: PerspectiveCamera | OrthographicCamera;

    constructor() {
        this.experince = new Experience();
        this.init();
        // this.listenStats(); 
    }

    private init() {
        this.createPerspectiveCamera();
    }

    private createPerspectiveCamera() {
        const cam = new PerspectiveCamera(
            75,
            this.experince.sizes.aspectRatio,
            1,
            90
        );

        // Set the camera position
        cam.position.set(0,10,50);

        const target = new Vector3(0, 5, 0); 
        cam.lookAt(target);

        // Add the camera to the scene
        this.experince.scene.add(cam);

        // // Add a helper to visualize the camera
        // const helper = new CameraHelper(cam);
        // this.experince.scene.add(helper);
        this.perspectiveCamera = cam ; 
        this.acctiveCamera = this.perspectiveCamera
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
        // this.controls.update();
    }

    keydown(e: KeyboardEvent) {
        if (e.code == "Numpad0") {
            this.perspectiveCamera.position.copy(this.cameraDefaultPos);
            this.controls.target.copy(this.cameraTarget);
        }
        if (e.code == 'KeyP') {
            this.acctiveCamera = this.perspectiveCamera;
        }
        if (e.code == 'KeyO') {
            this.acctiveCamera = this.orthographicCamera;
        }
    }

    resize() {
        this.perspectiveCamera.aspect = this.experince.sizes.aspectRatio;
        this.perspectiveCamera.updateProjectionMatrix();
    }
}