import React from 'react';


export default function logout() {

    const onClickHandler = (event) => {
        event.preventDefault();

        // remove token form local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_type");

        window.location.href = "/login";
    };

    return (
        <React.Fragment>
            <button
                onClick={(event) => {
                    onClickHandler(event);
                }}
                className="duration-300 bg-[#364c78] hover:bg-customDullBlue hover:border-customDullBlue w-96 py-3 rounded-3xl mb-1"
            >
                Log out
            </button>
        </React.Fragment>
    )
}
