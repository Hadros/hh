const ex = (value, sum, kek = null) => {console.log(value); console.log(sum); console.log(kek)};
const fx = ex.bind(null, 10);
ex(12, 7);
fx(7, 12);