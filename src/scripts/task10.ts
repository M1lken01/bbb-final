const solveTask10 = async () => {
  const res = await fetchTask(10);
  console.log('Response:', res);
  let answerData: any[] = [];

  res.data.questions.forEach((question) => {
    const clusters: { [key: string]: any[] } = {};
    const otherCities: any[] = [];
    question.params.map.cities.forEach((city: any) => {
      if (city.name.length === 1) clusters[city.name] = [city.name];
      else otherCities.push(city);
    });

    otherCities.forEach((city) => {
      let distances: any[] = [];
      Object.keys(clusters).forEach((key) => {
        let x: any = {};
        x[key] = city.distances[key];
        distances.push(x);
      });
      const smallestObject = distances.reduce((minObj, currentObj) =>
        (Object.values(currentObj)[0] as number) < (Object.values(minObj)[0] as number) ? currentObj : minObj,
      );
      clusters[Object.keys(smallestObject)[0]].push(city.name);
    });
    answerData.push({ id: question.ID, answer: clusters });
  });

  const data = { id: 10, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(10, solveTask10);
