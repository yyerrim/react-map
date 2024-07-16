import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

// function App() {
//   // const kakao = window.kakao;
//   // 일반 변수로 값을 할당시켜놓는것은 좋지 않은 방법임
//   const [kakao, setKakao] = useState(window.kakao);

//   // id="map"이 만들어진 후에(html이 만들어진 후) 코드가 동작되어야하기 때문에 useEffect 사용
//   useEffect(() => {
//     var container = document.getElementById('map');
//     var options = {
//       center: new kakao.maps.LatLng(33.450701, 126.570667),
//       level: 3
//     };
//     var map = new kakao.maps.Map(container, options);
//   }, []);

//   return (
//     <div className="App">
//       <div id="map" style={
//         {
//           width: '500px', height: '400px'
//         }
//       }></div>
//     </div>
//   );
// }

// 위도/경도 API marker로 표시 : https://ggoreb.pythonanywhere.com/location/data/
function App() {
  const [kakao, setKakao] = useState(window.kakao);
  const map = useRef();

  // 지도 생성
  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    // var map = new kakao.maps.Map(container, options);
    // map이 useEffect 내에서 정의되어 있기 때문에 addMarker 안에서 map: map으로 사용할 수 없음
    // ===> useRef를 사용하여 더 넓은 범위에 정의해주기
    map.current = new kakao.maps.Map(container, options);
  }, []);

  // 데이터 가져오기 + 마커 출력하기
  // const getData = async () => {
  //   const url = 'https://ggoreb.pythonanywhere.com/location/data/';
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
  // };
  // useEffect(async () => {
  //   const data = await getData();
  // }, []);
  // 에러 발생
  const addMarker = async () => {
    const url = 'https://ggoreb.pythonanywhere.com/location/data/';
    const res = await fetch(url);
    const data = await res.json();
    for (let i = 0; i < data.data.length; i++) {
      const marker = new kakao.maps.Marker({
        // map: map,
        map: map.current,
        position: new kakao.maps.LatLng(data.data[i].latitude, data.data[i].longitude),
        title: data.data[i].title
      });
    }
  };
  useEffect(() => {
    addMarker();
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
