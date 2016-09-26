export const ReverseContains = (arr, keyType) => {
  let newArr = new Map();
  arr.map((r) => {
    let subset = r[keyType];
    try {
      subset.map((s) => {
        if(!newArr.has(s)){
          newArr.set(s, {
            child: [r]
          })
        } else {
          newArr.get(s).child.push(r)
        }
      })
    } catch (error) {
      console.error(`${error.message}, Perhaps it is because ${keyType.constructor.name} is not exist on ${arr.constructor.name}.`)
    }
  })

  return newArr;
}

// API开头的方法都是相对API私有的方法
// res => array({
//   entrys: []{entry_id:id,value:value},
//   name: name,
//   spec_id: id
// })
// export const APIMapToSKU = (sku, map) => {
//    let newMap = new Map();
//    sku.map((res => {

//    }))
// }