import React, { useState } from 'react';

export default function Background() {
    return (
        <React.Fragment>
            <div className="absolute -z-9 -right-10 top-0 h-[70%] w-[70%] translate-x-[30%] -translate-y-[20%] rounded-full bg-[#54B8D8] opacity-40 blur-[180px]"></div>
            <div className="absolute -z-9 h-[100%] w-[100%] -translate-x-[40%] translate-y-[20%] rounded-full bg-customIndigo opacity-40 blur-[200px]"></div>
        </React.Fragment>
    )
}