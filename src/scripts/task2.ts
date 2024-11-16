type MapData = {
  dimensions: {
    width: number;
    height: number;
  };
  cities: {
    name: string;
    size: number;
    position: Vec2;
    distances: Record<string, number>;
  }[];
  roads: {
    id: number;
    tiles: Vec2[];
  }[];
};

const solveTask2 = async () => {
  const res = await fetchTask(2);
  console.log('Response:', res);
  let answerData: any[] = [];

  function calculateCityRoadCount(map: MapData): [number, number, number] {
    const numberOfSegments = map.roads.reduce((total, road) => {
      return total + (road.tiles.length - 1);
    }, 0);
    return [map.cities.length, map.roads.length, numberOfSegments];
  }

  res.data.questions.forEach((question) => {
    answerData.push({ id: question.ID, answer: calculateCityRoadCount(question.params.map) });
  });
  const data = { id: 2, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(2, solveTask2);
