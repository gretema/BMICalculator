/*
1. 點擊"看結果",該如何轉變成有樣式的BMI結果?
2. 寫好的.status(BMI狀態文字)為何沒出現在網頁上?
3. 寫好的loop按鈕為何沒出現在網頁上?
4. 點擊loop回到初始畫面(輸入欄為空且BMI結果回復為"看結果按鈕"),該如何做?
*/

//選取DOM
var send = document.querySelector('.send');
var list = document.querySelector('.list');
var ht_str = document.querySelector('#ht_str');
var wt_str = document.querySelector('#wt_str');
var data = JSON.parse(localStorage.getItem('listItem')) || []

var show = document.querySelector('.show');
var loop = document.querySelector('.loopBtn');
var BMIStatus = document.querySelector('.BMIStatus');

//事件監聽
send.addEventListener('click', cal);
list.addEventListener('click', del);
loop.addEventListener('click', refresh);
update(data); //用以顯示已存在local storage裡的紀錄

//計算及儲存
function cal(e) {
  e.preventDefault();
  if (ht_str.value.trim() === "" || wt_str.value.trim() === "") {
    alert('不可空白!!');
    return;
  }
  var ht_num = parseInt(ht_str.value);
  var wt_num = parseInt(wt_str.value);
  var BMI = wt_num / ((ht_num / 100) * (ht_num / 100));
  BMI = BMI.toFixed(1);
  var obj = {
    cm: ht_num,
    kg: wt_num,
    bmi: BMI,
  }
  data.push(obj);
  update(data);
  localStorage.setItem('listItem', JSON.stringify(data));
  ht_str.value = "";
  wt_str.value = "";
}

//渲染至網頁
function update(data) {
  var str = '';
  var content = ''; //裝show的東西
  var txt = '';  //裝BMI狀態

  for (i = 0; i < data.length; i++) {
    var BMI = data[i].bmi;
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var dash = "-";
    var timeRecord = month + dash + date + dash + year;
    if (BMI < 18.5) {
      str += '<li class="underWt"><span>過輕　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #31BAF9";
      show.style.color = "#31BAF9";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt underWtSty">過輕</p>'
      loop.style.display = "block";
    } else if (18.5 <= BMI && BMI < 25) {
      str += '<li class="normal"><span>理想　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #86D73F";
      show.style.color = "#86D73F";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt normalSty">理想</p>'
      loop.style.display = "block";
    } else if (25 <= BMI && BMI < 30) {
      str += '<li class="overWt"><span>過重　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #FF982D";
      show.style.color = "#FF982D";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt overWtSty">過重</p>'
      loop.style.display = "block";
    } else if (30 <= BMI && BMI < 35) {
      str += '<li class="fatI"><span>輕度肥胖　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #FF6C03";
      show.style.color = "#FF6C03";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt fatISty">輕度肥胖</p>'
      loop.style.display = "block";
    } else if (35 <= BMI && BMI < 40) {
      str += '<li class="fatII"><span>中度肥胖　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #FF6C03";
      show.style.color = "#FF6C03";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt fatIISty">中度肥胖</p>'
      loop.style.display = "block";
    } else if (40 <= BMI) {
      str += '<li class="fatIII"><span>重度肥胖　</span><span class="bmiItem">BMI </span>' + BMI + '<span class="wtItem">　weight </span>' + data[i].kg + 'kg <span class="htItem">　height </span>' + data[i].cm + 'cm　<span class="timeItem">' + timeRecord + '</span><a href="#" data-no=' + i + '>　刪除</a></li>';
      send.style.display = "none";
      show.style.display = "block";
      show.style.border = "6px solid #FF1200";
      show.style.color = "#FF1200";
      content = '<p class="bmiNum">' + BMI + '</p>' + '<p>BMI</p>';
      txt = '<p class="statusTxt fatIIISty">重度肥胖</p>'
      loop.style.display = "block";
    }


  }
  show.innerHTML = content;
  BMIStatus.innerHTML = txt;
  list.innerHTML = str;
}


//重整網頁
function refresh(e) {
  e.preventDefault();
  BMIStatus.style.display = "none";
  show.style.display = "none";
  send.style.display = "block";
  loop.style.display = "none";
}


//刪除資料
function del(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') { return; };
  var no = e.target.dataset.no;
  data.splice(no, 1);
  localStorage.setItem('listItem', JSON.stringify(data));
  update(data);
  send.style.display = "block";
  show.style.display = "none";
  loop.style.display = "none";
}