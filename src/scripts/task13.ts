const solveTask13 = async () => {
  const res = await fetchTask(13);
  console.log('Response:', res);
  let answerData: any[] = [];
  res.data.questions.forEach((question) => {
    const { params } = question;
    const startingCity = params.map.cities.find((city: any) => city.name === params.starting_city);
    const fullTour = [startingCity.name, ...params.tour];

    let battery = params.battery_size;
    let i = 0;

    for (i; i < fullTour.length; i++) {
      console.log({ i, isLast: i + 1 === fullTour.length });
      if (i + 1 === fullTour.length) break;
      let city = fullTour[i];
      const cityObj = params.map.cities.find((c: any) => c.name === city);
      const distToNext = cityObj.distances[fullTour[i + 1]];
      console.log({ recharge: city.length === 1, distToNext, battery, nBattery: battery - distToNext * 1.5 });
      battery -= distToNext * 1.5;
      if (city.length === 1) battery = params.battery_size;
      if (battery < 0) break;
    }

    const result = i + 1 === fullTour.length ? -1 : i;
    console.log(params.battery_size, startingCity, fullTour, fullTour[i]);
    console.log(result);
    answerData.push({ id: question.ID, answer: result });
  });

  const data = { id: 13, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(13, solveTask13);
