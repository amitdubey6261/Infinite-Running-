import { BoxGeometry, Color, Float32BufferAttribute, Vector3 } from "three";
import Experience from "./Experience";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { TreeUniforms } from "./types";


export default class Trees {
    experience !: Experience;
    constructor() {
        this.experience = new Experience();
    }

    getTreeGeometry() {

        const treeType1Uniforms: TreeUniforms = {
            trunk00: {
                dimesions: new Vector3(1, 1, 1),
                translation: new Vector3(0, 0, 0),
                color: new Color(0x8B4513),
            },
            trunk01: {
                dimesions: new Vector3(1, 1, 1),
                translation: new Vector3(0, 1.2, 0),
                color: new Color(0x8B4513),
            },
            trunk02: {
                dimesions: new Vector3(1, 1, 1),
                translation: new Vector3(0, 2.4, 0),
                color: new Color(0x8B4513),
            },
            trunk03: {
                dimesions: new Vector3(1, 1, 1),
                translation: new Vector3(0, 3.6, 0),
                color: new Color(0x8B4513),
            },
            trunk04: {
                dimesions: new Vector3(1, 1, 1),
                translation: new Vector3(0, 4.8, 0),
                color: new Color(0x8B4513),
            },
            leaves01: {
                dimesions: new Vector3(5, 1.5, 5),
                translation: new Vector3(0, 6.2, 0),
                color: new Color(0x00ff00),
            },
            leaves02: {
                dimesions: new Vector3(4, 1.2, 4),
                translation: new Vector3(0, 7.8, 0),
                color: new Color(0x00cc00),
            },
            leaves03: {
                dimesions: new Vector3(3, 1, 3),
                translation: new Vector3(0, 9.2, 0),
                color: new Color(0x009900),
            },
            leaves04: {
                dimesions: new Vector3(2, 1, 2),
                translation: new Vector3(2.5, 6.2, 0),
                color: new Color(0x00aa00),
            },
            leaves05: {
                dimesions: new Vector3(2, 1, 2),
                translation: new Vector3(-2.5, 6.2, 0),
                color: new Color(0x00aa00),
            },
            leaves06: {
                dimesions: new Vector3(2, 1, 2),
                translation: new Vector3(0, 6.2, 2.5),
                color: new Color(0x00aa00),
            },
            leaves07: {
                dimesions: new Vector3(2, 1, 2),
                translation: new Vector3(0, 6.2, -2.5),
                color: new Color(0x00aa00),
            },
        };

        const geometries = [];
        for (const [key] of Object.entries(treeType1Uniforms)) {

            const boxGeometry = new BoxGeometry(
                treeType1Uniforms[key].dimesions.x,
                treeType1Uniforms[key].dimesions.y,
                treeType1Uniforms[key].dimesions.z
            );

            boxGeometry.translate(
                treeType1Uniforms[key].translation.x,
                treeType1Uniforms[key].translation.y,
                treeType1Uniforms[key].translation.z,
            )


            const count = boxGeometry.attributes.position.count;
            const colors = [];
            for (let i = 0; i < count; i++) {
                colors.push(
                    treeType1Uniforms[key].color.r,
                    treeType1Uniforms[key].color.g,
                    treeType1Uniforms[key].color.b,
                );
            }
            boxGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

            geometries.push(boxGeometry);
        }

        const mergedGeometry = mergeGeometries(geometries);

        return mergedGeometry ; 
    }

}