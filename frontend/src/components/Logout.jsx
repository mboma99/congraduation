import React from 'react';


export default function logout() {

    const onClickHandler = (event) => {
        event.preventDefault();

        // remove token form local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_type");
        const user_type = localStorage.getItem("user_type")
        let hyperRef = ''
        if (user_type === "photographer"){
            hyperRef = '/login-admin'
        } else {
            hyperRef = '/login'
        }
        localStorage.removeItem("user_type")

        window.location.href = hyperRef;
    };

    return (
        <React.Fragment>
            <button
                onClick={(event) => {
                    onClickHandler(event);
                }}
                className="duration-300 hover:bg-[#364c78] bg-customDullBlue hover:border-customDullBlue w-96 py-3 rounded-3xl mb-1"
            >
                Log out
            </button>
        </React.Fragment>
    )
}
