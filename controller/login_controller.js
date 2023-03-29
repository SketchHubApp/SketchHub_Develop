const loginService = require('../service/login_service');
const userService = require('../service/user_service');

// exports.loginPage = async (req, res, next) => {
//     try {
//         res.render('login');
//     } catch (err) {
//         console.error(err);
//         // next(err);
//     }
// }

// 로그인
exports.login = async (req, res, next) => {
    const { id, pw } = req.body;
    try {
        let auth = await loginService.userAuth(id, pw, next); // user Num 리턴됨
        if (auth) res.send('sketch'); // success login, connect flutter
        else {
            console.log('fail');
            res.send("fail");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// find id (name, phone number)
exports.findId = async (req, res, next) => {
    const {name, phone, birthday} = req.body;
    try {
        let user = await userService.findId(name, phone, birthday, next);
        if (user) {
            console.log(user.user_name); // user ID
            res.send('ID 찾기 성공')
        } else {
            console.log("등록되지 않은 ID");
            res.send('등록되지 않은 ID')
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// find password (name, phone number)
exports.findPw = async (req, res, next) => {
    const { id, name, birthday } = req.body;
    // const {id, name, birthday} = {id: 'kys', name: 'kim', birthday: '20000411'};
    try {
        let user = await userService.findPw(id, name, birthday, next);
        if (user) {
            let newPw = '12345';
            console.log(user.password);
            await userService.updatePw(user.user_name, newPw, next);
            res.send('비밀번호 바꿈');
        } else {
            console.log('무언가 잘못 입력함..');
            res.send('비밀번호 찾기 실패')
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}