const teamcode = '173b257fb4c47eb4a9e6';
const url = 'http://bitkozpont.mik.uni-pannon.hu/2024/';

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

/*type QuestionParams = {
  number1: number;
  number2: number;
  type: string;
};*/
type QuestionParams = any;

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

function openDesc(desc: string) {
  window.open(url + desc, '_blank');
}
