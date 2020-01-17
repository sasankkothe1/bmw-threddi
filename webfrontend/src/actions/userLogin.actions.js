import UserLoginDispatcher from '../dispatchers/userLogin.dispatcher';
import AuthService from "../services/auth.service";

class UserLoginActions {

    loginCheck(data) {
        AuthService.login(data)
            .then((jwtTOKEN) => {
                UserLoginDispatcher.dispatch({
                    actionType:'LOGIN_SUCCESSFUL',
                    value: jwtTOKEN
                });
            })
            .catch((error)=>{
                UserLoginDispatcher.dispatch({
                    actionType: 'LOGIN_ERROR',
                    value: error
                });
            }
        );
    }

}

export default new UserLoginActions()