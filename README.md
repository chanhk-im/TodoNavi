# TodoNavi

## 1. About...

React Native 어플리케이션 개발을 위해 한 공부에서 얻은 정보들을 정리하기 위해 만든 react native + mongodb 기반 간단한 게시판 앱입니다.

### 1.1. 개발 도구

-   Frontend: React Native
-   Backend: Node.js(express), MongoDB

## 2. 시작하기 전...

이 프로젝트를 시험하시려면 다음의 절차를 실행해야 합니다.

### 2.1. TodoNavi 디렉토리에서:

**Secret.js** 파일 생성 후

```
export const ip = (자신의 ip)
export const port = 8080(또는 다른 포트)
```

를 작성한 이후 저장.

**터미널**에서는

```
npm install
npm start
```

를 실행.

### 2.2. TodoNavi/backend 디렉토리에서:

**터미널**에서

```
npm install
node app.js
```

를 실행.

## 3. RESTful 서버의 API 목록

| Route                     | Method | Description                              |
| ------------------------- | ------ | ---------------------------------------- |
| /api/posts                | GET    | 모든 post의 데이터 조회                  |
| /api/posts/:posts_id      | GET    | \_id값에 해당하는 post의 데이터 조회     |
| /api/posts/author/:author | GET    | author 값에 해당하는 post의 데이터 조회  |
| /api/posts/               | POST   | post 데이터 생성                         |
| /api/posts/:post_id       | PUT    | \_id값에 해당하는 post의 데이터 업데이트 |
| /api/posts/:post_id       | DELETE | \_id값에 해당하는 post의 데이터 삭제     |

## 4. 기능
**C.R.U.D.**

## 5. (거의 베끼다시피 한) 참고 자료
<https://velopert.com/594>
<https://docs.mongodb.com/manual/>
<https://geekhub.co.kr/react-native/releases/0.37/docs/network.html>