import * as THREE from 'three';
import Experience from './Experience';
import { GLTF } from 'three/examples/jsm/Addons.js';

export default class Character {
    experience: Experience;
    mixer: THREE.AnimationMixer | null = null;
    actions: { [key: string]: THREE.AnimationAction } = {};
    currentAction: THREE.AnimationAction | null = null;

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
            gltfModel.scene.position.set(2.5,1.2,45);

            this.experience.scene.add(gltfModel.scene);

            // Setup animation mixer
            this.mixer = new THREE.AnimationMixer(gltfModel.scene);
            gltfModel.animations.forEach((clip) => {
                const action = this.mixer!.clipAction(clip);
                this.actions[clip.name] = action;
            });

            this.playAnimation("Run")

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
            this.mixer.update(this.experience.time.delta * .001);
        }
    }

    keydown(e: KeyboardEvent) {
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
        }
    }

    getAvailableAnimations(): string[] {
        return Object.keys(this.actions);
    }
}
