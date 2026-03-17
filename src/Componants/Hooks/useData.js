import React, { useEffect, useState } from 'react';

const useData = () => {
        const [profiles, setProfiles] = useState([])
    useEffect(() => {
        fetch('/profileData.json')
            .then(res => res.json())
            .then(data => setProfiles(data))
    }, [])
           
    return {profiles}
};

export default useData;