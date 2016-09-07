export default (arr, keyType) => {
  let newArr = new Map();
  arr.map((r) => {
  console.log(r)
    let subset = r[keyType];
    try {
      subset.map((s) => {
        if(!newArr.has(s)){
          newArr.set(s, [r])
        } else {
          newArr.get(s).push(r)
        }
      })
    } catch (error) {
      console.error(`${error.message}, Perhaps it is because ${keyType.constructor.name} is not exist on ${arr.constructor.name}.`)
    }
  })

  return newArr;
}