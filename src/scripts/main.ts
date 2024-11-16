const url = 'http://bitkozpont.mik.uni-pannon.hu/2024/';

type Vec2 = { x: number; y: number };

type AllTasks = {
  status: 'success' | 'error';
  data: {
    task_list: Task[];
    dependencies: Dependency[];
  };
  message: string;
  hash: string;
};

type Task = {
  ID: number;
  level: number;
  stage: number;
  points: number;
  state: 'OPEN' | 'CLOSED';
};

type Dependency = {
  before: string;
  after: string;
};

type TaskResponse = {
  status: 'success' | 'error';
  data: {
    attempt: number;
    description: string;
    questions: Question[];
    ID: number;
    level: number;
    stage: number;
    points: number;
    state: 'OPEN' | 'CLOSED';
  };
  message: string;
  hash: string;
};

type Question = {
  ID: string;
  question_id: string;
  question_type: string;
  order: string;
  params: QuestionParams;
};

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

type QuestionParams = any;

function createTaskButtons(): void {
  const parentElement = document.querySelector('#tasks') as HTMLDivElement;
  for (let i = 1; i <= 16; i++) {
    const button = document.createElement('button');
    button.id = `task-${i}`;
    button.disabled = true;
    button.className = 'gray-button';
    button.textContent = `Solve Task ${i}`;
    parentElement.appendChild(button);
  }
}

function initTaskButton(id: number, fn: Function): void {
  const button = document.querySelector(`#task-${id}`) as HTMLButtonElement;
  button.disabled = false;
  button.onclick = () => fn();
}

function calculateShortestDistance(city1: Vec2, city2: Vec2): number {
  const dx = Math.abs(city2.x - city1.x);
  const dy = Math.abs(city2.y - city1.y);
  return parseFloat((Math.min(dx, dy) * Math.SQRT2 + Math.abs(dx - dy)).toFixed(2));
}

function getReachableCities(params: TravelParams): string[] {
  const { map, battery_size, starting_city } = params;
  const maxDistance = battery_size / 1.5;
  const startingCity = map.cities.find((city) => city.name === starting_city);
  if (!startingCity) throw new Error('No starting city');
  const reachableCities = map.cities
    .filter((city) => {
      const distance = startingCity.distances[city.name];
      return distance !== undefined && distance <= maxDistance;
    })
    .map((city) => city.name);
  if (!reachableCities.includes(starting_city)) reachableCities.push(starting_city);
  return reachableCities;
}

function sendXHRRequest(url: string, method: 'POST' | 'PUT' | 'PATCH', body: Record<string, any>) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          reject(new Error('Failed to parse JSON response'));
        }
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(JSON.stringify(body));
  });
}

async function fetchTask(id: number): Promise<TaskResponse> {
  const res = (await sendXHRRequest(url + 'gettasks.php', 'POST', { id, teamcode })) as TaskResponse;
  if (res == null) throw new Error('No response from server');
  return res;
}

async function fetchAllTasks(): Promise<TaskResponse> {
  const res = (await sendXHRRequest(url + 'gettasks.php', 'POST', { id: 'all', teamcode })) as TaskResponse;
  if (res == null) throw new Error('No response from server');
  return res;
}

function openDesc(desc: string) {
  window.open(url + desc, '_blank');
}

async function main() {
  createTaskButtons();
  console.log(await fetchAllTasks());
}

main();
