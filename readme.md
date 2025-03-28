# Computational Solid Geometry 🚀

![Home Screen](./public/Doc/homeScreen.png)

**Computational Solid Geometry** is a project that enables slicing of solid geometries created with Three.js. CSG (Constructive Solid Geometry) operations are powered by the **three-mesh-bvh-csg** library, while slicing is performed interactively using a **cutting plane**.

---

## Tech for Real-Time Rendering

**WebGL 2.0** – The primary rendering API used in this project, providing access to GPU-accelerated graphics within the browser.

**Three.js** – A powerful and widely-used JavaScript library for 3D graphics, simplifying the process of creating and rendering 3D scenes in the browser. Three.js serves as the core framework for rendering geometries and GLTF models.

---

## Computer Graphics Concepts

1. [Constructive Solid Geometry](https://en.wikipedia.org/wiki/Constructive_solid_geometry)  
2. [Bounding Volume Hierarchy](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy)  
3. [Raycasting](https://github.com/gkjohnson/three-mesh-bvh)  

---

## How to Use

### 📺 Demo Video

[![Watch the demo](https://img.youtube.com/vi/i-cC9nrSR90/0.jpg)](https://youtu.be/i-cC9nrSR90?si=rhRZGRYSXOtXU6J6)

---

1. **Open the project in a browser.**  
   ![Home Screen](./public/Doc/homeScreen.png)

2. **Select an element** by clicking on it. The selected mesh will change its color.  
   ![Select Mesh](./public/Doc/selectMesh.png)

3. **Use orbit controls** to rotate the 3D scene and find your preferred angle for slicing.  
   ![Orbit Controls](./public/Doc/homeScreenOrbit.png)

4. **Create a cutting plane** by holding the Control key and dragging the mouse.  
   ![Cutting Plane](./public/Doc/CuttingPlane.png)

5. **Undo a cutting plane** by pressing the "X" key if you're not satisfied with the result.  
   ![Undo Cutting Plane](./public/Doc/undoCuttingPlane.png)

6. **Slice the mesh** into two parts by pressing the "C" key.  
   ![Cutting](./public/Doc/separatedMesh.png)

7. **Select and move separated meshes independently.**  
   ![Move Separated Mesh](./public/Doc/moveSeparetdMesh.png)

8. **Toggle Geometry** by pressing the "G" key. You can toggle geometry or add new geometry.  
   ![Toggle Geometry](./public/Doc/toggleGeometry.png)

9. **Load GLTF models** by dragging files from your local file explorer. This repository includes sample GLTF models from the [KhronosGroup GLTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/main/2.0).  
   ![Load GLTF](./public/Doc/loadGLTFModel.png)

---

## Installation

```bash
git clone https://github.com/amitdubey6261/computational-solid-geometry
npm install
npm run dev
```

---

## Acknowledgments

A huge thanks to the brilliant minds behind the tools that made this project possible:

- [Mr. Doob](https://x.com/mrdoob?lang=en) – Creator of Three.js, the backbone of browser-based 3D graphics.  
- [Garrett Johnson](https://x.com/garrettkjohnson?lang=en) – Developer of Three-Mesh-BVH, essential for efficient rendering and geometry slicing.