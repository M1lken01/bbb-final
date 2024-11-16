type MapData = {
  dimensions: {
    width: number;
    height: number;
  };
  cities: City[];
  roads: Road[];
};

type City = {
  name: string;
  size: number;
  position: {
    x: number;
    y: number;
  };
  distances: Record<string, number>;
};

type Road = {
  id: number;
  tiles: { x: number; y: number }[];
};

const solveTask2 = async () => {
  const res = await fetchTask(2);
  console.log('Response:', res);
  //window.open(url + res.data.description, '_blank');
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

//solveTask2();
