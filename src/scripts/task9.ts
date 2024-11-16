const solveTask9 = async () => {
  const res = await fetchTask(9);
  console.log('Response:', res);
  let answerData: any[] = [];

  res.data.questions.forEach((question) => {
    let diffData: any[] = [];
    question.params.map.cities.forEach((city1: any) => {
      let largestDiffOfCity: any;
      Object.keys(city1.distances).forEach((city2: any) => {
        const data = {
          cities: [city1.name, city2],
          diff: calculateShortestDistance(city1.position, question.params.map.cities.find((x: any) => x.name === city2).position) / city1.distances[city2],
        };
        if (largestDiffOfCity == undefined || largestDiffOfCity.diff > data.diff) largestDiffOfCity = data;
      });
      diffData.push(largestDiffOfCity);
    });

    const smallest = diffData.reduce((minObj, currentObj) => (currentObj.diff < minObj.diff ? currentObj : minObj));
    answerData.push({ id: question.ID, answer: smallest.cities });
  });

  const data = { id: 9, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(9, solveTask9);
