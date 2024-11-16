type TravelParams = {
  map: {
    cities: {
      name: string;
      distances: Record<string, number>;
    }[];
  };
  battery_size: number;
  starting_city: string;
};

const solveTask3 = async () => {
  const res = await fetchTask(3);
  console.log('Response:', res);
  let answerData: any[] = [];

  function getReachableCities(params: TravelParams): string[] {
    const { map, battery_size, starting_city } = params;
    const maxDistance = battery_size / 1.5;
    const startingCity = map.cities.find((city) => city.name === starting_city);
    if (!startingCity) throw new Error('No city');
    const reachableCities = map.cities
      .filter((city) => {
        const distance = startingCity.distances[city.name];
        return distance !== undefined && distance <= maxDistance;
      })
      .map((city) => city.name);
    if (!reachableCities.includes(starting_city)) reachableCities.push(starting_city);
    return reachableCities;
  }

  res.data.questions.forEach((question) => {
    answerData.push({ id: question.ID, answer: getReachableCities(question.params) });
  });
  const data = { id: 3, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

//solveTask3();
