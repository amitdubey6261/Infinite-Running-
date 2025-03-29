import { AnimationAction, AnimationMixer, Vector3 } from 'three';
import Experience from './Experience';
import { GLTF } from 'three/examples/jsm/Addons.js';

export default class Character {
    experience: Experience;
    mixer: AnimationMixer | null = null;
    actions: { [key: string]: AnimationAction } = {};
    currentAction: AnimationAction | null = null;
    targetPosition!: Vector3;

    characterModel !: GLTF;

    leftPosition: Vector3 = new Vector3(-1, 0, 35)
    centerPosition: Vector3 = new Vector3(0, 0, 35)
    rightPosition: Vector3 = new Vector3(1, 0, 35)


    constructor() {
        this.experience = new Experience();
        this.init();
    }

    init() {
        this.loadCharacter();
    }

    loadCharacter() {
        this.experience.resources.gltfloader.load('./models/Fox.glb', (gltfModel: GLTF) => {
            gltfModel.scene.scale.multiplyScalar(0.05);
            gltfModel.scene.rotation.y = Math.PI;
            gltfModel.scene.position.set(0, 1, 35);

            this.experience.scene.add(gltfModel.scene);

            // Setup animation mixer
            this.mixer = new AnimationMixer(gltfModel.scene);
            gltfModel.animations.forEach((clip) => {
                const action = this.mixer!.clipAction(clip);
                this.actions[clip.name] = action;
            });

            this.playAnimation("Run")

            this.characterModel = gltfModel;
            this.targetPosition = this.characterModel.scene.position.clone();

        });
    }

    playAnimation(name: string) {
        if (!this.mixer || !this.actions[name]) return;

        if (this.currentAction) {
            this.currentAction.fadeOut(0.5);
        }

        this.currentAction = this.actions[name];
        this.currentAction.reset().fadeIn(0.5).play();
    }

    update() {
        if (this.mixer) {
            this.mixer.update(this.experience.time.delta * .003);
        }
        this.characterModel.scene.position.lerp(this.targetPosition, 0.05); 
    }

    keydown(e: KeyboardEvent) {
        console.log(e.code)
        switch (e.code) {
            case "Numpad0":
                this.playAnimation("Survey")
                break;
            case "Numpad1":
                this.playAnimation("Walk")
                break;
            case "Numpad2":
                this.playAnimation("Run")
                break;
            case "ArrowUp":
                break;
            case "ArrowLeft":
                if( this.targetPosition.x > -5 ) this.targetPosition.x -= 5;
                break;
            case "ArrowRight":
                if( this.targetPosition.x < 5 ) this.targetPosition.x += 5;
                break;
        }
    }

    getAvailableAnimations(): string[] {
        return Object.keys(this.actions);
    }
}
