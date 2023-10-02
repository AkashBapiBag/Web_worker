/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const processedData = sumUsingWorker(data);
  postMessage(processedData);
});

const sumUsingWorker = (number: number) => {
  let count = 0;
  for (let i = 0; i <= number; i++) {
    let flag = 0;
    for (let j = 2; j < i; j++)
      if (i % j == 0) {
        flag = 1;
        break;
      }
    if (i > 1 && flag == 0) count += i;
  }
  return count;
};
