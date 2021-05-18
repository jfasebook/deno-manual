let url = Deno.args[0];
let res = await fetch(url);

console.log(res);