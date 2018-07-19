
const setBody = (html) => { 
  document.body.innerHTML = html
}

const object1 = {
  a: 1,
  b: 2,
  c: 3,
  e: {p:'aaaa'}
};
const object2 = Object.assign({ c: 4, d: 5 }, object1);
object2.e.p = 'bbbb';
object2.a = 0;

const html = `object1:${JSON.stringify(object1)}<br/> object2:${JSON.stringify(object2)}`
setBody(html);

console.log("foobar".includes("foo"));