import './style.css'
import Experience from "./Experience/Experience";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

if (canvas) {
	const experience = new Experience(canvas);
	console.log(experience);
}