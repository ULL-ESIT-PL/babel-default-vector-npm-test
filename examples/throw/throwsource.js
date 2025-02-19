// This version of throw.js works
let array = [10, 15, 30, else i => {
    throw `Se ha intentado acceder a la posición: ${i} que no existe`
  }];

try {
  console.log(array[0]);
  console.log(array[1]);
  console.log(array[2]);
  console.log(array[3]);
} catch (e) {
  console.log(e);
}