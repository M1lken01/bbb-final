const solveTask6 = async () => {
  const res = await fetchTask(6);
  console.log('Response:', res);
  let answerData: any[] = [];

  res.data.questions.forEach((question) => {
    const [city1, city2] = question.params.map.cities.filter((city: any) => city.name === question.params.city1 || city.name === question.params.city2);
    answerData.push({ id: question.ID, answer: Math.round(calculateShortestDistance(city1.position, city2.position) * 100) / 100 });
  });

  const data = { id: 6, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(6, solveTask6);
