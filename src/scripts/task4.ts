type IntersectionParams = {
  map: {
    roads: { id: number; tiles: Vec2[] }[];
  };
  road_id: number;
};

const solveTask4 = async () => {
  const res = await fetchTask(4);
  console.log('Response:', res);
  let answerData: any[] = [];

  function findIntersections(params: IntersectionParams): number[] {
    const { map, road_id } = params;
    const mainRoad = map.roads.find((road) => road.id === road_id);
    if (!mainRoad) throw new Error('No road');
    const mainRoadTiles = new Set(mainRoad.tiles.map((tile) => `${tile.x},${tile.y}`));
    const intersectingRoadIds = map.roads
      .filter((road) => road.id !== road_id)
      .filter((road) => {
        return road.tiles.some((tile) => mainRoadTiles.has(`${tile.x},${tile.y}`));
      })
      .map((road) => road.id);
    return intersectingRoadIds;
  }

  res.data.questions.forEach((question) => {
    answerData.push({ id: question.ID, answer: findIntersections(question.params) });
  });
  const data = { id: 4, teamcode, answer_data: answerData, original_hash: res.hash, original_data: res.data };
  console.log(data);
  const result = (await sendXHRRequest(url + 'answer.php', 'POST', data)) as any;
  console.log(result);
};

initTaskButton(4, solveTask4);
