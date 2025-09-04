import { BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial } from 'three';

function createCube() {

  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshLambertMaterial({
    color:"yellow",
  });
  const cube = new Mesh(geometry, material);

  return cube;
}

export { createCube };
