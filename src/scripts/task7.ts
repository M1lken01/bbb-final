const solveTask7 = async () => {
  const res = await fetchTask(7);
  console.log('Response:', res);
  let answerData: any[] = [];

  /*res.data.questions.forEach((question) => {
    answerData.push({ id: question.ID, answer: findCitiesWithinRange(question.params) });
  });

  const data = { id: 7, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);*/
};

//solveTask7();
