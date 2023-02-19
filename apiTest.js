const testCall = async () => {
  const response = await fetch("https://api.goprogram.ai/inspiration");
  const data = await response.json();
  return data;
};

fetch(`https://api.goprogram.ai/inspiration`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
// testCall();
