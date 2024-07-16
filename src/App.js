import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // const kakao = window.kakao;
  // 일반 변수로 값을 할당시켜놓는것은 좋지 않은 방법임
  const [kakao, setKakao] = useState(window.kakao);

  // id="map"이 만들어진 후에(html이 만들어진 후) 코드가 동작되어야하기 때문에 useEffect 사용
  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="App">
      <div id="map" style={
        {
          width: '500px', height: '400px'
        }
      }></div>
    </div>
  );
}

export default App;
