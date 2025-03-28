import { Color, DynamicDrawUsage, InstancedMesh, Matrix4, MeshStandardMaterial, Object3D, Quaternion,Vector3 } from "three";
import Experience from "./Experience";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import Trees from "./Tree";
export default class Ground {

    experience !: Experience;
    groundMaterials: MeshStandardMaterial[] = [];
    boxes !: InstancedMesh;
    groundUniforms !: any;

    dummy: Object3D = new Object3D();

    trees !: Trees;
    sceneTrees!: InstancedMesh ; 
    totalTrees : number | undefined = undefined ; 

    constructor() {
        this.experience = new Experience();
        this.trees = new Trees();

        this.init();
    }

    init() {

        const groundUniforms = {
            rows: 20,
            cols: 20,
            boxGeometryDimensions: new Vector3(5, 1, 5),
            boxGeometrySmmothing: 2,
            boxGeometryRadius: .1,
            boxSpacing: 1.05,
            grroundSpeed: .5,
            treeIntesity: .1 , 
            groundVelocity : new Vector3( 0 , 0 , .1 ) 
        }

        const boxGeometry = new RoundedBoxGeometry(
            groundUniforms.boxGeometryDimensions.x,
            groundUniforms.boxGeometryDimensions.y,
            groundUniforms.boxGeometryDimensions.z,
            groundUniforms.boxGeometrySmmothing,
            groundUniforms.boxGeometryRadius
        );

        boxGeometry.translate(0, groundUniforms.boxGeometryDimensions.y / 2, 0);
        boxGeometry.computeBoundingBox();
        boxGeometry.computeVertexNormals();
        const boxMaterial = new MeshStandardMaterial();

        const boxes = new InstancedMesh(boxGeometry, boxMaterial, groundUniforms.rows * groundUniforms.cols);
        boxes.instanceMatrix.setUsage(DynamicDrawUsage);
        this.experience.scene.add(boxes);

        const dummyObject = this.dummy;

        // Calculate spacing based on bounding box
        const boundingBox = boxGeometry.boundingBox!;
        const boxSizeX = boundingBox.max.x - boundingBox.min.x;
        const boxSizeZ = boundingBox.max.z - boundingBox.min.z;

        const spacing = groundUniforms.boxSpacing;
        const offsetX = boxSizeX * spacing;
        const offsetZ = boxSizeZ * spacing;

        // Center the grid in world space
        const totalWidth = (groundUniforms.rows - 1) * offsetX;
        const totalDepth = (groundUniforms.cols - 1) * offsetZ;
        const centerOffsetX = totalWidth / 2;
        const centerOffsetZ = totalDepth / 2;



        let boxIdx = 0;
        const redBoxIndices = new Set();
        
        // Collect eligible indices (excluding rows 9, 10, 11)
        const eligibleRedBoxIndices = [];
        for (let row = 0; row < groundUniforms.rows; row++) {
            if (row !== 9 && row !== 10 && row !== 11) {
                for (let col = 0; col < groundUniforms.cols; col++) {
                    eligibleRedBoxIndices.push(row * groundUniforms.cols + col);
                }
            }
        }
        
        // Randomly select some of the eligible indices to be red (e.g. 5% of total boxes)
        const redBoxCount = Math.floor(eligibleRedBoxIndices.length * groundUniforms.treeIntesity);
        while (redBoxIndices.size < redBoxCount) {
            const randomIdx = Math.floor(Math.random() * eligibleRedBoxIndices.length);
            redBoxIndices.add(eligibleRedBoxIndices[randomIdx]);
        }
        
        // trees
        const treeGeometry = this.trees.getTreeGeometry();
        const treeMaterial = new MeshStandardMaterial({ vertexColors: true });
        const sceneTrees = new InstancedMesh(treeGeometry, treeMaterial, redBoxCount);
        this.totalTrees = redBoxCount ; 
        this.experience.scene.add(sceneTrees);
        
        let treeIdx = 0;
        
        for (let row = 0; row < groundUniforms.rows; row++) {
            for (let col = 0; col < groundUniforms.cols; col++) {
                const x = row * offsetX - centerOffsetX;
                const z = col * offsetZ - centerOffsetZ;
                const y = (row == 9 || row == 10 || row == 11) ? 0 : Math.random();
        
                dummyObject.position.set(x, y, z);
                dummyObject.updateMatrix();
                boxes.setMatrixAt(boxIdx, dummyObject.matrix);
        
                if (redBoxIndices.has(boxIdx)) {
                    boxes.setColorAt(boxIdx, new Color(0x5E2F0C)); // Red
        
                    // Add tree at this position
                    const treeY = y + 1.7; // offset so tree is above the box
                    dummyObject.position.set(x, treeY, z);
                    dummyObject.updateMatrix();
                    sceneTrees.setMatrixAt(treeIdx, dummyObject.matrix);
                    treeIdx++;
                } else if (row == 9 || row == 10 || row == 11) {
                    boxes.setColorAt(boxIdx, new Color(0x8B4513)); // Black
                } else {
                    boxes.setColorAt(boxIdx, new Color(0, Math.random(), 0)); // Random green
                }
        
                boxIdx++;
            }
        }
        
        sceneTrees.instanceMatrix.needsUpdate = true;


        boxes.instanceMatrix.needsUpdate = true;
        boxes.computeBoundingSphere();
        this.boxes = boxes;
        this.groundUniforms = groundUniforms;

        this.sceneTrees = sceneTrees ; 
    }

    update() {
        if (this.groundUniforms && this.boxes && this.sceneTrees && this.totalTrees) {
            const matrix = new Matrix4();
            const position = new Vector3();
            const quaternion = new Quaternion();
            const scale = new Vector3();
    
            // Update boxes
            for (let idx = 0; idx < this.boxes.count; idx++) {
                this.boxes.getMatrixAt(idx, matrix);
                matrix.decompose(position, quaternion, scale);
                position.add(this.groundUniforms.groundVelocity);
    
                if (position.z > 52.5) {
                    position.z = -52.5;
                }
    
                this.dummy.position.copy(position);
                this.dummy.updateMatrix();
                this.boxes.setMatrixAt(idx, this.dummy.matrix);
            }
            this.boxes.instanceMatrix.needsUpdate = true;
    
            // Update trees
            for (let tree = 0; tree < this.totalTrees; tree++) {
                this.sceneTrees.getMatrixAt(tree, matrix);
                matrix.decompose(position, quaternion, scale);
                position.add(this.groundUniforms.groundVelocity);
    
                if (position.z > 52.5) {
                    position.z = -52.5;
                }
    
                this.dummy.position.copy(position);
                this.dummy.updateMatrix();
                this.sceneTrees.setMatrixAt(tree, this.dummy.matrix);
            }
            this.sceneTrees.instanceMatrix.needsUpdate = true;
        }
    }


}