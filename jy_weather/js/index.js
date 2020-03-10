// 导入
// import http from './http.js';

window.onload = function () {

    class Weather {

        makeDate(date) {
            let d = new Date(date);

            // 获取当前的时间
            let t = new Date();



            if (t.getDate() > d.getDate()) {
                return '昨天';
            } else if (t.getDate() === d.getDate()) {
                return '今天';
            } else {
                // 获取天
                let day = d.getDate();
                // 获取月
                let m = d.getMonth() + 1;

                return m + '/' + day;
            }


        }

        query(sel) {
            return document.querySelectorAll(sel);
        }

        // 渲染当前实况
        initNow(o) {
            this.query('.city')[0].innerHTML = o.basic.location;
            // 当前温度
            let temp = this.query('.temp')[0];
            temp.innerText = o.now.tmp;

            // 当前天气文本
            let now = this.query('.now')[0];
            now.innerText = o.now.cond_txt;

            // 周几
            let date = new Date(o.update.loc);

            let obj = {
                0: '周日',
                1: '周一',
                2: '周二',
                3: '周三',
                4: '周四',
                5: '周五',
                6: '周六'
            }

            let day = this.query('.day')[0];

            day.innerText = obj[date.getDay()];

            // 下面就是渲染今天详细情况
            let nowAbout = this.query('.now-about')[0];
            nowAbout.innerHTML = '';
            let nowArr = [
                {
                    id: 'fl',
                    unit: '°',
                    des: '体感温度',
                    url: './img/wendu.png'
                },
                {
                    id: 'vis',
                    unit: '千米',
                    des: '能见度',
                    url: './img/nengjiandu.png'
                },
                {
                    id: 'pcpn',
                    unit: '毫米',
                    des: '降水量',
                    url: './img/rain.png'
                },
                {
                    id: 'hum',
                    unit: '%rh',
                    des: '相对湿度',
                    url: './img/IOTtubiao_huabanfuben.png'
                },
                {
                    id: 'wind_sc',
                    unit: '级',
                    des: `${o.now.wind_dir}`,
                    url: './img/feng.png'
                },
                {
                    id: 'pres',
                    unit: '百帕',
                    des: '气压',
                    url: './img/qiya.png'
                },

            ];

            for (let v of nowArr) {
                let div = document.createElement('div');
                div.className = 'now-item';
                let str = `
                <div class="now-img" style="background-image: url(${v.url});"></div>
                <div class="now-item-msg">${o.now[v.id] + v.unit}</div>
                <div class="now-item-des">${v.des}</div>
                `;

                div.innerHTML = str;
                nowAbout.append(div);
            }


        }

        // 渲染生活状况
        initLifestyle(o) {
            let level = this.query('.level')[0];
            level.innerText = o[7].brf;

            let lifeArr = [
                {
                    id: 'comf',
                    des: '舒适度指数',
                    url: './img/sofa.png'
                },
                {
                    id: 'cw',
                    des: '洗车指数',
                    url: './img/washcar.png'
                },
                {
                    id: 'flu',
                    des: '感冒指数',
                    url: './img/flu.png'
                },
                {
                    id: 'sport',
                    des: '运动指数',
                    url: './img/sport.png'
                },
                {
                    id: 'trav',
                    des: `旅游指数`,
                    url: './img/bag.png'
                },
                {
                    id: 'mu',
                    des: '化妆指数',
                    url: './img/makeface.png'
                },
                {
                    id: 'ptfc',
                    des: '交通指数',
                    url: './img/road.png'
                },
                {
                    id: 'spi',
                    des: '防晒指数',
                    url: './img/light.png'
                }];

            let lifeList = this.query('.life-about')[0];

            lifeList.innerHTML = '';

            for (let v of lifeArr) {
                let div = document.createElement('div');
                div.className = 'life-item';

                let brf = null;
                for (let i = 0; i < o.length; i++) {
                    if (o[i].type == v.id) {
                        brf = o[i].brf;
                        break;
                    }
                }

                let str = `
                    <div class="life-img" style="background-image: url(${v.url});"></div>
                    <div class="life-item-msg">${brf}</div>
                    <div class="life-item-des">${v.des}</div>
                    `;
                div.innerHTML = str;
                lifeList.append(div);
            }



        }

        // 渲染小时预报
        initHourly(o) {
            let list = this.query('.weather-list')[0];

            list.innerHTML = '';
            for (let v of o) {
                let time = v.time.split(' ')[1];
                let div = document.createElement('div');
                div.className = 'weather-item';
                let str = `
                    <div>${time}</div>
                    <div>
                        <div class="weather-img" style="background-image: url('https://cdn.heweather.com/cond_icon/${v.cond_code}.png');"></div>
                    </div>
                    <div>${v.cond_txt}</div>
                    <div>${v.tmp}°C</div> `;
                div.innerHTML = str;

                list.appendChild(div);

            }


        }

        // 渲染天气预报
        initForecast(o) {
            this.top = [];
            this.bottom = [];
            let forecastList = this.query('.forcase-list')[0];

            // 情空列表
            forecastList.innerHTML = '';

            let tmpMin = this.query('.tmp_min')[0];
            let tmpMax = this.query('.tmp_max')[0];


            for (let v of o) {
                this.top.push(v.tmp_max);
                this.bottom.push(v.tmp_min);
                let time = this.makeDate(v.date);
                if (time === '今天') {
                    tmpMin.innerText = v.tmp_min + '°C';
                    tmpMax.innerText = v.tmp_max + '°C';
                }

                let div = document.createElement('div');
                div.className = "forcase-item";
                let str = `     <div class="item-t">
                                    <div>${time}</div>
                                    <div class="forcase-img" style="background-image: url('https://cdn.heweather.com/cond_icon/${v.cond_code_d}.png');"></div>
                                    <div>${v.tmp_max}°</div>
                                </div>
                                <div class="item-m"></div>
                                <div class="item-b">
                                    <div>${v.tmp_min}°</div>
                                    <div class="forcase-img" style="background-image: url('https://cdn.heweather.com/cond_icon/${v.cond_code_n}.png');"></div>
                                </div>   `;
                div.innerHTML = str;

                forecastList.append(div);
            }


            this.printForecast();

        }



        // 本地数据渲染
        localInit(o) {

            /**
             * weather{
             *  address : {
             *        now:{},lifestyle:{},hourly:{},forecast:{}
             *      }
             * }
             * 
             *  */

            let now = o.now;
            this.initNow(now.HeWeather6[0]);

            let lifestyle = o.lifestyle;
            this.initLifestyle(lifestyle.HeWeather6[0].lifestyle);

            let hourly = o.hourly;
            this.initHourly(hourly.HeWeather6[0].hourly);

            let forecast = o.forecast;
            this.initForecast(forecast.HeWeather6[0].daily_forecast);

        }

        // 请求渲染
        severInit(address) {
            // 下面全部拿出去，作为函数
            let self = this;

            async function init() {
                // 如果不存在本地数据，开启构造
                let weather = JSON.parse(localStorage.getItem('weather')) || {};

                // 这是一层拦截层
                // console.log(weather[address])
                if (weather[address] != undefined) {
                    console.log("位置没有改变");


                    // 从本地拿数据进行渲染
                    self.localInit(weather[address]);
                    return;
                }

                // 最后需要存到数据中的东西
                weather[address] = {};

                // 获取实时天气状态
                let res2 = await http.getPromise({
                    url: 'https://api.heweather.net/s6/weather/now',
                    data: {
                        location: address,
                        key: '66c50bac70ef414fab2974f89f5efba0'
                    },
                    isAsync: true
                })

                res2 = JSON.parse(res2);

                if (res2.HeWeather6[0].status === "unknown location") {
                    alert("请输入有效地址");
                    return;
                }
                weather[address].now = res2;

                // 渲染当前天气
                self.initNow(res2.HeWeather6[0]);

                // 获取
                let res3 = await http.getPromise({
                    url: 'https://api.heweather.net/s6/weather/lifestyle',
                    data: {
                        location: address,
                        key: '66c50bac70ef414fab2974f89f5efba0'
                    },
                    isAsync: true
                })

                weather[address].lifestyle = JSON.parse(res3);

                // 渲染当前生活状况
                self.initLifestyle(JSON.parse(res3).HeWeather6[0].lifestyle);

                // 获取逐个小时报告
                let res4 = await http.getPromise({
                    url: 'https://api.heweather.net/s6/weather/hourly',
                    data: {
                        location: address,
                        key: '66c50bac70ef414fab2974f89f5efba0'
                    },
                    isAsync: true
                })

                weather[address].hourly = JSON.parse(res4);
                // 渲染当前生活状况
                self.initHourly(JSON.parse(res4).HeWeather6[0].hourly);

                // 获取天气预报
                let res5 = await http.getPromise({
                    url: 'https://api.heweather.net/s6/weather/forecast',
                    data: {
                        location: address,
                        key: '66c50bac70ef414fab2974f89f5efba0'
                    },
                    isAsync: true

                })



                self.initForecast(JSON.parse(res5).HeWeather6[0].daily_forecast);

                weather[address].forecast = JSON.parse(res5);
                // 存入本地数据
                localStorage.setItem('weather', JSON.stringify(weather));


            }

            init();
        }


        // 搜索事件
        searchEvent() {
            let btn = this.query('.search-btn')[0];
            let search = this.query('.search>input')[0];

            btn.onclick = () => {
                let self = this;
                let val = search.value.trim();
                search.value = '';
                if (val == "") {
                    alert('输入点东西吧');
                    return;
                }


                self.severInit(val);



            }

            search.onkeyup = (e) => {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    btn.click();
                }
            }

        }

        initCanvas() {
            let forcaseList = this.query(".forcase-list")[0];
            let canvas = this.query('#canvas')[0];
            canvas.width = forcaseList.offsetWidth;
            canvas.height = Math.floor(forcaseList.offsetHeight * 0.3);
            canvas.style.top = Math.floor(forcaseList.offsetHeight * 0.42) + 'px';
        }


        printForecast() {

            let canvas = this.query('#canvas')[0];


            let width = canvas.width;

            let height = canvas.height;

            let ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, width, height);

            let maxTem = Math.max(...this.top);
            let minTem = Math.min(...this.bottom);

            console.log(maxTem, minTem);

            let deep = maxTem - minTem;

            let y = 10,
                r = 4;
            let spaceH = (height - y) / deep;
            console.log('spaceH==>', spaceH)
            let spaceW = Math.ceil(width / 10);


            for (let i = 0; i < this.top.length; i++) {

                let pointX = (spaceW / 2) + spaceW * i;
                let pointY = spaceH * (maxTem - this.top[i]) + y / 2;


                ctx.beginPath();
                ctx.fillStyle = '#FE7B28';
                ctx.arc(pointX, pointY, r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                if (i != (this.top.length - 1)) {

                    ctx.beginPath();
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#FE7B28';
                    ctx.moveTo(pointX, pointY);
                    ctx.lineTo((pointX + spaceW), (spaceH * (maxTem - this.top[i + 1]) + y / 2));
                    ctx.stroke();
                    ctx.closePath();
                }


            }

            for (let j = 0; j < this.bottom.length; j++) {
                let pointX = (spaceW / 2) + spaceW * j;
                let pointY = spaceH * (maxTem - this.bottom[j]) + y / 2;

                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.fillStyle = '#639CF2';
                ctx.arc(pointX, pointY, r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();
                if (j != (this.bottom.length - 1)) {
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = '#639CF2';
                    ctx.beginPath();
                    ctx.moveTo(pointX, pointY);
                    ctx.lineTo((pointX + spaceW), (spaceH * (maxTem - this.bottom[j + 1]) + y / 2));
                    ctx.stroke();
                    ctx.closePath();
                }

            }


        }



        init() {
            let self = this;

            // console.log('http==>', http);

            this.searchEvent();

            // 初始化camvas
            this.initCanvas();

            async function main() {
                // 根据ip地址锁定当前用户所在的地区
                let res1 = await http.jsonp({
                    url: 'http://api.map.baidu.com/location/ip',
                    data: {
                        ak: 'D5hd1GmrjX9itCaMYRrhG1tTQGr4vQw0'
                    },
                    callback: 'callback'
                })

                let address = res1.content.address_detail.city;

                if (/市$/.test(address)) {
                    address = address.slice(0, -1);
                }

                self.severInit(address);
            }

            main();


            function jiuLiu(fn, delay) {
                let bool = true;
                return () => {
                    if (!bool) {
                        return;
                    }

                    bool = false;

                    setTimeout(() => {
                        fn();
                        bool = true;
                    }, delay)
                }
            }

            // 改变尺寸之后重新绘制
            window.addEventListener('resize', jiuLiu(function () {
                self.initCanvas();
                self.printForecast(self.top, self.bottom);
            }, 500))

            this.query('.container')[0].onscroll = jiuLiu(function () {
                let top = self.query('.container')[0].scrollTop;

                let nav = self.query('.nav')[0];

                let height = nav.offsetHeight;
                // console.log(height);
                let opcity = (top / height) / 2 > 1 ? 1 : (top / height) / 2;
                // console.log(opcity);
                // console.log(nav)
                nav.style.backgroundColor = `rgba(61, 66, 69,${opcity})`;
            }, 50);


        }
    }

    Weather.prototype.top = [];
    Weather.prototype.bottom = [];

    let weather = new Weather();

    weather.init();
}