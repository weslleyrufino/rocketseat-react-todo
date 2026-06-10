export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));// O resolve está dentro de setTimeout, para emular a chamda de uma api, ou seja, o delay é o tempo que a resposta da api demora para chegar.
}