const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  let arrayMerged = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) 
      arrayMerged.push(arr1[i++]);
    else if (arr1[i] === arr2[j]) {
      arrayMerged.push(arr1[i]);
      return arrayMerged;
    }
    else
      arrayMerged.push(arr2[j++]);
  }

  while(i < arr1.length) 
    arrayMerged.push(arr1[i++]);
  while(j < arr2.length)
    arrayMerged.push(arr2[j++])

  return arrayMerged;
}

export const sortArray = (array) => {
  let mid = Math.floor(array.length / 2)

  if (array.length === 1)
    return [array[0]];

  return merge(sortArray(array.slice(0, mid)), sortArray(array.slice(mid)))
}