import LoginService from "../service/login"

// export const login = () => ({ type: 'LOGIN_SUCCESS' })

// export const login = userInfo => dispatch => {
//     LoginService.login(userInfo).then(res => {
//         // dispatch({
//         //     type: 'LOGIN_SUCCESS',
//         //     payload: {
//         //         ...res
//         //     }
//         // })
//         getMoreUserInfo(dispatch, res)
//     }).catch(err => {
//         dispatch({
//             type: 'LOGIN_FAILURE',
//             payload: {
//                 ...err
//             }
//         })
//     })
// }

// export const login = userInfo => async (dispatch) => {
//     const res = await loginPromise(dispatch, userInfo)
//     if (res) {
//         getMoreUserInfo(dispatch, res)
//     }
// }

export const login = (userInfo) => ({ type: "LOGIN_SAGA", payload: userInfo })

const loginPromise = (dispatch, userInfo) => {
    return LoginService.login(userInfo).then(res => {
        return res
    }).catch(err => {
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: {
                ...err
            }
        })
    })
};

const getMoreUserInfo = (dispatch, userInfo) => {
    return LoginService.getMoreUserInfo(userInfo).then(res => {
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                ...res
            }
        });
    });
};