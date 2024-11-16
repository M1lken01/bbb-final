const solveTask1 = async () => {
  const res = await fetchTask(1);
  console.log('Response:', res);
  let answerData: any[] = [];

  res.data.questions.forEach((question) => {
    const { type, number1, number2 } = question.params;
    answerData.push({ id: question.ID, answer: type === 'ADDITION' ? number1 + number2 : number1 - number2 });
  });

  const data = { id: 1, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(1, solveTask1);
