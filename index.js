const axios = require('axios');
const fs = require('fs');
const dayjs = require('dayjs');

async function App() {
    // 한국 시간 기준 오늘 날짜 객체
    const baseDate = dayjs(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

    // 오늘부터 7일간의 날짜 배열 (YYYY-MM-DD, YYYYMMDD 둘 다 사용)
    const weekDates = Array.from({ length: 7 }, (_, i) => ({
        dash: baseDate.add(i, 'day').format('YYYY-MM-DD'),
        nodash: baseDate.add(i, 'day').format('YYYYMMDD')
    }));

    let results = [];

    for (const dateObj of weekDates) {
        let json = {};

        // 효민 기숙사
        let hyomin_temp = [];
        try {
            const res = await axios("http://dorm.deu.ac.kr/hyomin/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=" + dateObj.dash);
            const data = res.data["root"][0].WEEKLYMENU[0];
            for (let idx = 0; idx < 8; idx++) {
                hyomin_temp.push({
                    "Date": data["fo_date" + idx],
                    "breakfast": data["fo_menu_mor" + idx],
                    "lunch": data["fo_menu_lun" + idx],
                    "dinner": data["fo_menu_eve" + idx]
                });
            }
        } catch (error) {
            hyomin_temp.push({ "Date": "No data" });
        }
        json.hyomin = hyomin_temp;

        // 행복기숙사
        let happy_temp = [];
        try {
            const res = await axios("http://dorm.deu.ac.kr/deu/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=" + dateObj.dash);
            for (let main_idx = 0; main_idx < 1; main_idx++) {
                const data = res.data["root"][0].WEEKLYMENU[main_idx];
                for (let idx = 1; idx < 8; idx++) {
                    happy_temp.push({
                        "Date": data["fo_date" + idx],
                        "breakfast": data["fo_menu_mor" + idx],
                        "lunch": data["fo_menu_lun" + idx],
                        "lunch_s": data["fo_sub_lun" + idx],
                        "dinner": data["fo_menu_eve" + idx],
                        "dinner_s": data["fo_sub_eve" + idx],
                    });
                }
            }
        } catch (error) {
            happy_temp.push({ "Date": "No data" });
        }
        json.happy = happy_temp;

        // 정보관
        try {
            const res = await axios("https://smart.deu.ac.kr/m/sel_dfood?date=" + dateObj.nodash + "&gubun2=2&gubun1=1");
            if (JSON.stringify(res.data).indexOf("정보공학관") === -1) {
                json.information = null;
            } else {
                json.information = res.data;
            }
        } catch (error) {
            json.information = null;
        }

        // 수덕전
        try {
            const res = await axios("https://smart.deu.ac.kr/m/sel_dfood?date=" + dateObj.nodash + "&gubun2=1&gubun1=1");
            if (JSON.stringify(res.data).indexOf("수덕전") === -1) {
                json.suduck = null;
            } else {
                json.suduck = res.data;
            }
        } catch (error) {
            json.suduck = null;
        }

        // 날짜 정보 추가
        json.date = dateObj.dash;

        // 결과 배열에 추가
        results.push(json);
    }

    fs.writeFileSync('./output/api.json', JSON.stringify(results, null, 2), 'utf-8');
}

App();
