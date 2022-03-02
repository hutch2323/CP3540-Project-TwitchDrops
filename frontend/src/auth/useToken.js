import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        if( newToken == null ) {
            localStorage.removeItem('token');
        }
        else {
            localStorage.setItem('token', newToken);
        }
        setTokenInternal(newToken);
    }

    return [token, setToken];
}