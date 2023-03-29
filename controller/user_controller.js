const userService = require('../service/user_service');

// 회원가입
exports.signUp = async (req, res, next) => {
    const {id, pw, name, email, birthday, phone, sex, nation} = req.body;
    try {
        let confirmId = await userService.readUserId(id, next);
        if (!confirmId) {
            let user = await userService.createUser(id, pw, next);
            console.log(user.userNo);
            req.session.nid = user.userNo; // user number(PK) 저장
            // user 세션 userNo 정보 저장해야함 (일단 test 니까 skip 하겠음)
            await userService.createAuthentication(name, email, birthday, phone, sex, nation, user.userNo);
            req.session.save(() => res.send('회원가입 완료'))
        } else {
            // 중복된 ID가 있을 경우.
            res.send('중복 ID')
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}


// // 일단, id 중복 controller 로 뺌 <- Ajax 로 처리할 건지, 알림으로 처리할 건지 결정해야 함.
// exports.confirmId = async (req, res, next) => {
//     // const id = req.params.userId; // 이 부분 프론트 확인해줘
//     const id = 'test_id';
//     try {
//         let result = await userService.readUserId(id);
//         if (!result) {
//             console.log("승인."); // 이거 바꿔야함
//         } else {
//             console.log("중복된 ID 입니다.");
//         }
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// }

// create profile
exports.createProfile = async (req, res, next) => {
    const {nickname, introduce} = req.body;
    try {
        await userService.createProfile(nickname, introduce, req.session.nid, next)
            .then(() => res.send('프로필 생성'));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// profile 수정
exports.updateProfile = async (req, res, next) => {
    const {nickname, introduce} = req.body
    try {
        console.log(req.session.nid)
        await userService.updateProfile(nickname, introduce, req.session.nid);
        res.send('수정 성공');
    } catch (err) {
        console.error(err);
        next(err);
    }
}