const axios = require("axios");
const fs = require("fs");
const dayjs = require("dayjs");

async function App() {
  // 한국 시간 기준 날짜 객체
  const baseDate = dayjs(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  // 날짜 형식 생성 (7일치)
  const weekDates = Array.from({ length: 7 }, (_, i) => ({
    dash: baseDate.add(i, "day").format("YYYY-MM-DD"),
    nodash: baseDate.add(i, "day").format("YYYYMMDD")
  }));

  const Korea_Date = baseDate.format("YYYY-MM-DD");
  const result = { hyomin: [], happy: [], meals: [] };

  // 효민 기숙사 데이터 처리
  try {
    const res = await axios.get(`http://dorm.deu.ac.kr/hyomin/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=${Korea_Date}`);
    const weeklyMenu = res.data.root[0].WEEKLYMENU[0];
    
    for (let idx = 0; idx < 8; idx++) {
      result.hyomin.push({
        Date: weeklyMenu[`fo_date${idx}`],
        breakfast: weeklyMenu[`fo_menu_mor${idx}`],
        lunch: weeklyMenu[`fo_menu_lun${idx}`],
        dinner: weeklyMenu[`fo_menu_eve${idx}`]
      });
    }
  } catch (error) {
    result.hyomin.push({ Date: "No data" });
  }

  // 행복기숙사 데이터 처리
  try {
    const res = await axios.get(`http://dorm.deu.ac.kr/deu/food/getWeeklyMenu.kmc?locgbn=DE&sch_date=${Korea_Date}`);
    const weeklyMenu = res.data.root[0].WEEKLYMENU[0];
    
    for (let idx = 1; idx < 8; idx++) {
      result.happy.push({
        Date: weeklyMenu[`fo_date${idx}`],
        breakfast: weeklyMenu[`fo_menu_mor${idx}`],
        lunch: weeklyMenu[`fo_menu_lun${idx}`],
        lunch_s: weeklyMenu[`fo_sub_lun${idx}`],
        dinner: weeklyMenu[`fo_menu_eve${idx}`],
        dinner_s: weeklyMenu[`fo_sub_eve${idx}`]
      });
    }
  } catch (error) {
    result.happy.push({ Date: "No data" });
  }

  // 학식 데이터 수집
  for (const date of weekDates) {
    const mealData = { date: date.dash };
    
    // 정보관 식당
    try {
      const res = await axios.get(`https://smart.deu.ac.kr/m/sel_dfood?date=${date.nodash}&gubun2=2&gubun1=1`);
      mealData.information = JSON.stringify(res.data).includes("정보공학관") ? res.data : null;
    } catch (error) {
      mealData.information = null;
    }

    // 수덕전 식당
    try {
      const res = await axios.get(`https://smart.deu.ac.kr/m/sel_dfood?date=${date.nodash}&gubun2=1&gubun1=1`);
      mealData.suduck = JSON.stringify(res.data).includes("수덕전") ? res.data : null;
    } catch (error) {
      mealData.suduck = null;
    }

    result.meals.push(mealData);
  }

  // 파일 저장
  fs.writeFileSync('./output/api.json', JSON.stringify(result, null, 2), 'utf-8');
}

App();
