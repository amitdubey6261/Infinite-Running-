import { Color, Vector3 } from "three";

type TreePartUniform = {
    dimesions: Vector3;
    translation: Vector3;
    color: Color;
};

export type TreeUniforms = {
    [partName: string]: TreePartUniform;
};