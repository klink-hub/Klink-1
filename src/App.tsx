import { useState } from 'react'; 
import './style.css'; 

const supabaseUrl = 'https://tbxoriibpmslifckxzwd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieG9yaWlicG1zbGlmY2t4endkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTE0OTMsImV4cCI6MjA3MDMyNzQ5M30.4gwjKaDLb54PbtrbvjQugBFU4CgZqg5IoGBJqR9uPSc';

function App() {
  const [drama, setDrama] = useState('');
  const [menu, setMenu] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/get-korean-drama-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ drama, menu }),
      });

      if (!response.ok) {
        throw new Error('Supabase 함수 호출에 실패했습니다.');
      }

      const data = await response.text();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>📺 드라마 & 메뉴 검색</h1>
      <p>드라마에 나온 메뉴의 레시피와 관련 여행지를 찾아보세요.</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={drama} 
          onChange={(e) => setDrama(e.target.value)} 
          placeholder="드라마 제목을 입력하세요 (예: 슬기로운 의사생활)" 
          required 
        />
        <input 
          type="text" 
          value={menu} 
          onChange={(e) => setMenu(e.target.value)} 
          placeholder="메뉴 이름을 입력하세요 (예: 칼국수)" 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? '검색 중...' : '검색'}
        </button>
      </form>
      {result && (
        <div className="result-box">
          <h2>🔍 검색 결과:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
  );
}

export default App;
