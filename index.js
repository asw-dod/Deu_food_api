const axios = require('axios');
const fs = require('fs')
const dayjs = require('dayjs')


async function App() {
    //기본 선언
    const Korea_Date = dayjs(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })).format('YYYY-MM-DD')
    let json = {}; let json_temp = []; let responce = ""; let data = ""

    //효민 기숙사
    responce = await axios("http://dorm.deu.ac.kr/hyomin/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=" + Korea_Date);
    data = responce.data["root"][0].WEEKLYMENU[0];
    for (let index = 2; index < 8; index++) {
        json_temp.push({
            "Date": data["fo_date" + index],
            "breakfast": data["fo_menu_mor" + index],
            "lunch" : data["fo_menu_lun" + index],
            "dinner": data["fo_menu_eve" + index]
        })
    }
    json = Object.assign(json, { "hyomin": json_temp })

    //초기화
    json_temp = []

    //행복기숙사
    responce = await axios("http://dorm.deu.ac.kr/deu/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=" + Korea_Date);
    for (let main_index = 0; main_index < 1; main_index++) {
        data = responce.data["root"][0].WEEKLYMENU[main_index];
        for (let index = 1; index < 8; index++) {
                json_temp.push( {
                    "Date": data["fo_date" + index],
                    "breakfast": data["fo_menu_mor" + index],
                    "lunch" : data["fo_menu_lun" + index],
                    "lunch_s": data["fo_sub_lun" + index],
                    "dinner": data["fo_menu_eve" + index],
                    "dinner_s": data["fo_sub_eve" + index],
                })
            
        }
    }
    json = Object.assign(json, { "happy": json_temp })
    
    //초기화
    json_temp = []

    //시간 포맷변경
    const Korea_Date1 = dayjs(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })).format('YYYYMMDD')

    //정보관
    responce = await axios("https://smart.deu.ac.kr/m/sel_dfood?date=" + Korea_Date1 + "&gubun2=2&gubun1=1")
    json = Object.assign(json, { "inforamtion": responce.data })
    //수덕전
    responce = await axios("https://smart.deu.ac.kr/m/sel_dfood?date=" + Korea_Date1 + "&gubun2=1&gubun1=1")
    json = Object.assign(json, { "suduck": responce.data })

    fs.writeFileSync('./output/api.json',JSON.stringify(json), 'utf-8')
}

App()
