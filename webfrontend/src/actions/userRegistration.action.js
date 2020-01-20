import UserRegistrationDispatcher from '../dispatchers/userRegistration.dispatcher';
import RegService from "../services/register.service";

class UserRegistrationAction {

    registrationCheck(data) {
        RegService.register(data)
            .then((jwtTOKEN) => {
                UserRegistrationDispatcher.dispatch({
                    actionType:'REGISTRATION_SUCCESSFUL',
                    value: jwtTOKEN
                });
            })
            .catch((error)=>{
                UserRegistrationDispatcher.dispatch({
                    actionType: 'REGISTRATION_ERROR',
                    value: error
                });
            }
        );
    }

}

export default new UserRegistrationAction()