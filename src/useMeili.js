import { useState } from 'react';

export default function useMeili() {
    const getMeiliToken = () => {
        const meilitokenString = sessionStorage.getItem('meili');
        const meiliToken = JSON.parse(meilitokenString);
        return meiliToken?.apikeys.meili
    };
    const [meilitoken, setMeiliToken] = useState(getMeiliToken());

    const saveMeiliToken = meiliToken => {
        sessionStorage.setItem('meili', JSON.stringify(meiliToken));
        setMeiliToken(meiliToken.apikeys.meili);
    };

    return {
        setMeiliToken: saveMeiliToken,
        meilitoken
    }

}