import { BoxGeometry, BufferGeometry, Color, Float32BufferAttribute, InstancedMesh, Matrix4, MeshStandardMaterial, Euler, Vector3, Quaternion, Object3D } from "three";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";

export default class Sky {
    experience: Experience;
    gridSize: { x: number; y: number; z: number };
    instancedMesh!: InstancedMesh;
    dummy: Object3D;
    groundVelocity: Vector3;

    constructor(gridSize = { x: 10, y: 10, z: 5 }) {
        this.experience = new Experience();
        this.gridSize = gridSize;
        this.dummy = new Object3D();
        this.groundVelocity = new Vector3(0, 0, 0.2); // example velocity

        this.init();
    }

    init() {
        const geometry = this.createCloudGeometry();
        const material = new MeshStandardMaterial({ vertexColors: true });

        const instanceCount = 15;
        this.instancedMesh = new InstancedMesh(geometry, material, instanceCount);

        const matrix = new Matrix4();
        const range = 150;

        for (let i = 0; i < instanceCount; i++) {
            const x = (Math.random() - 0.5) * range;
            const y = (Math.random() - 0.5) * 20 + 40;
            const z = (Math.random() - 0.5) * range;

            const rotation = new Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            matrix.makeRotationFromEuler(rotation);
            matrix.setPosition(x, y, z);

            this.instancedMesh.setMatrixAt(i, matrix);
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;
        this.experience.scene.add(this.instancedMesh);
    }

    update() {
        if (!this.instancedMesh) return;

        const matrix = new Matrix4();
        const position = new Vector3();
        const quaternion = new Quaternion();
        const scale = new Vector3();

        for (let i = 0; i < this.instancedMesh.count; i++) {
            this.instancedMesh.getMatrixAt(i, matrix);
            matrix.decompose(position, quaternion, scale);

            position.add(this.groundVelocity);
            if (position.z > 52.5) {
                position.z = -52.5;
            }

            this.dummy.position.copy(position);
            this.dummy.quaternion.copy(quaternion);
            this.dummy.scale.copy(scale);
            this.dummy.updateMatrix();

            this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;
    }

    createCloudGeometry() {
        const spacing = 1.2;
        const showProbability = 0.08;
        const offsetRange = 0.6;

        const geometries: BufferGeometry[] = [];
        const grey = new Color(0xffffff);

        for (let i = 0; i < this.gridSize.x; i++) {
            for (let j = 0; j < this.gridSize.y; j++) {
                for (let k = 0; k < this.gridSize.z; k++) {
                    if (Math.random() > showProbability) continue;

                    const width = 0.5 + Math.random() * 1.5;
                    const height = 0.5 + Math.random() * 1.5;
                    const depth = 0.5 + Math.random() * 1.5;

                    const boxGeometry = new BoxGeometry(width, height, depth);

                    const colors = [];
                    for (let idx = 0; idx < boxGeometry.attributes.position.count; idx++) {
                        colors.push(grey.r, grey.g, grey.b);
                    }
                    boxGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

                    const x = (i - (this.gridSize.x - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;
                    const y = (j - (this.gridSize.y - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;
                    const z = (k - (this.gridSize.z - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;

                    boxGeometry.translate(x, y, z);
                    boxGeometry.rotateX(Math.random() * Math.PI * 0.1);
                    boxGeometry.rotateY(Math.random() * Math.PI * 0.2);
                    geometries.push(boxGeometry);
                }
            }
        }

        return BufferGeometryUtils.mergeGeometries(geometries);
    }
}



















// import { BoxGeometry, BufferGeometry, Color, Euler, Float32BufferAttribute, InstancedMesh, Matrix4, MeshStandardMaterial } from "three";
// import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
// import Experience from "./Experience";

// export default class Sky {
//     experience: Experience;
//     gridSize: { x: number; y: number; z: number };

//     constructor(gridSize = { x: 4, y: 4, z: 4 }) {
//         this.experience = new Experience();
//         this.gridSize = gridSize;

//         this.init();
//     }

//     init() {
//         const geometry = this.createCloudGeometry();
//         const material = new MeshStandardMaterial({ vertexColors: true });

//         const instanceCount = 30;
//         const instancedMesh = new InstancedMesh(geometry, material, instanceCount);

//         const matrix = new Matrix4();
//         const range = 100; // grid range in world units

//         for (let i = 0; i < instanceCount; i++) {
//             const x = (Math.random() - 0.5) * range;
//             const y = (Math.random() - 0.5) * 20 + 25;
//             const z = (Math.random() - 0.5) * range; // 

//             const rotation = new Euler(
//                 Math.random() * Math.PI*.4,
//                 Math.random() * Math.PI*.8,
//                 Math.random() * Math.PI*.2
//             );

//             matrix.makeRotationFromEuler(rotation);
//             matrix.setPosition(x, y, z);

//             instancedMesh.setMatrixAt(i, matrix);
//         }

//         instancedMesh.instanceMatrix.needsUpdate = true;
//         this.experience.scene.add(instancedMesh);
//     }

//     createCloudGeometry() {
//         const spacing = 1.2;
//         const showProbability = 0.2;
//         const offsetRange = 0.6;

//         const geometries: BufferGeometry[] = [];
//         const grey = new Color(0xffffff);

//         for (let i = 0; i < this.gridSize.x; i++) {
//             for (let j = 0; j < this.gridSize.y; j++) {
//                 for (let k = 0; k < this.gridSize.z; k++) {
//                     if (Math.random() > showProbability) continue;

//                     const width = 0.5 + Math.random() * 1.5;
//                     const height = 0.5 + Math.random() * 1.5;
//                     const depth = 0.5 + Math.random() * 1.5;

//                     const boxGeometry = new BoxGeometry(width, height, depth);

//                     const colors = [];
//                     for (let idx = 0; idx < boxGeometry.attributes.position.count; idx++) {
//                         colors.push(grey.r, grey.g, grey.b);
//                     }
//                     boxGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

//                     const x = (i - (this.gridSize.x - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;
//                     const y = (j - (this.gridSize.y - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;
//                     const z = (k - (this.gridSize.z - 1) / 2) * spacing + (Math.random() - 0.5) * offsetRange;

//                     boxGeometry.translate(x, y, z);
//                     boxGeometry.rotateX(Math.random() * Math.PI * 0.1);
//                     boxGeometry.rotateY(Math.random() * Math.PI * 0.2);
//                     geometries.push(boxGeometry);
//                 }
//             }
//         }

//         return BufferGeometryUtils.mergeGeometries(geometries);
//     }
// }