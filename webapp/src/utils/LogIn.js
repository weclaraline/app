import localForage from 'localforage';
export const CURRENT_LOGGED_USER = "user";

export const setCurrentLoggedUserInfo = async (response) => {
    const  { profileObj : userInfo } = response;
    await localForage.setItem(CURRENT_LOGGED_USER, userInfo);
}

export const getCurrentLoggedUserInfo =  async ()  => await localForage.getItem(CURRENT_LOGGED_USER);

export const clearCurrentLoggedUserInfo = async () => localForage.setItem(CURRENT_LOGGED_USER, null);

export const isUserLoggedIn = async () => {
    const isLogged = await localForage.getItem(CURRENT_LOGGED_USER);
    if(isLogged != null && JSON.stringify(isLogged) != '{}' && typeof isLogged !== 'undefined'){
        return true;
    }
    return false;
}