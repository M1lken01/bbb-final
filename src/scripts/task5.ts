const solveTask5 = async () => {
  const res = await fetchTask(5);
  console.log('Response:', res);
  let answerData: any[] = [];

  res.data.questions.forEach((question) => {
    let result: any;
    let furthest: number = -Infinity;

    question.params.map.cities.forEach((city: any) => {
      const minValue = Math.min(...(Object.values(city.distances) as number[]));
      if (result == undefined || furthest < minValue) {
        result = city;
        furthest = minValue;
      }
    });

    answerData.push({ id: question.ID, answer: result.name });
  });

  const data = { id: 5, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(5, solveTask5);
