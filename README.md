# :thinking:What is Repo?
이 레포는 다른 레포에서 쓰이는 api를 제공하기 위해서 만든 레포입니다.<br>
<br><br>
API 링크
https://raw.githubusercontent.com/asw-dod/Deu_food_api/master/output/api.json

# Refresh Time
매주 자정 또는 1시


# api 형식

## 요약
```
{
  hyomin{...},
  happy{...},
  inforamtion{...},
  suduck{...}
}
```

`hyomin` 효민기숙사 <br>
`happy` 행복시숙사<br>
`information` 정보관<br>
`suduck` 수덕전<br>

## 효민기숙사
Example 
```
[
  {
    "Date":"2022-04-11",
    "breakfast":"김치찌개 그릴소시지 스크렘블에그 콩자반 깍두기",
    "lunch":"콩나물국 언양파채불고기 꽃맛살샐러드 청경채나물 김치",
    "dinner":"근대국 등심돈가스&어니언소스 비빔쫄면 열무나물 김치"
  }
  ... more 7
]
```
### Date `string`
날짜 표시를 표시함니다.

### breakfast,lunch,dinner `string`
식단정보 입니다.

## 행복기숙사
Example 
```
[
  {
    "Date":"2022-04-11",
    "breakfast":"떡갈비조림 / 간장고추지 / 동원양반김 / 열무된장국 / 쌀밥 / 포기김치",
    "lunch":"탕수육 / 새송이버섯볶음 / 간장마늘쫑지 / 계란파국 / 쌀밥 / 포기김치",
    "lunch_s":"백선생st 고기집볶음밥 / 콘버터구이 / 계란파국 / 깍두기",
    "dinner":"깐풍미니돈까스 / 실곤약마요무침 / 오이지참기름무침 / 맑은무채국 / 쌀밥 / 포기김치",
    "dinner_s":"새우탕면 / 고구마맛탕 / 포기김치
  }
]
```
### Date `string`
날짜 표시를 표시함니다.

### breakfast,lunch,dinner `string`
식단정보 입니다.

### breakfast_s, lunch_s, dinner_s `string`
일품정보입니다.<br>
일품 정보는 주말이나 아침에는 제공되지 않을수 있습니다.

## 정보관, 수덕전
Example 
```
[
  {
      "수덕전 코너3":[ // 건물명 + 건물 이름
                        {
                          "rk":null,
                          "menuDate":"2022-04-15",
                          "kioskName":"수덕전 코너3",
                          "menuName":"치즈떡볶이&참치비빔밥",
                          "menuTime":"11:00 ~ 15:00"
                          }
                      ]
    } .. more
]
```
정보관, 수덕전은 이렇게 공통된 구조를 가지고 있습

### menuDate `String`
오늘 날짜

### kioskName `String`
건물명 + 건물 이름

### menuNmae `String`
메뉴 이름

### menuTime `String`
학식 운영시간




|만든이|
|-----|
|<img src="https://user-images.githubusercontent.com/87979171/162585096-70d66225-252e-4ebd-a2b8-2745282ab878.png" width="100" height="100">
|[INMD1](https://github.com/INMD1)|
