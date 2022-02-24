export function fetchUser() {
    axios.get('/users/fetch')
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

export function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


