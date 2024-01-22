import React, { useState } from 'react';

export default function BackgroundActions() {
    return (
        <React.Fragment>
            <div className="absolute -z-10 -right-10 top-0 h-[70%] w-[70%] translate-x-[30%] -translate-y-[20%] rounded-full bg-[#679FB1] opacity-40 blur-[180px]"></div>
            <div className="absolute -z-10 h-[100%] w-[100%] -translate-x-[40%] translate-y-[20%] rounded-full bg-[#9291E8] opacity-40 blur-[200px]"></div>
        </React.Fragment>
    )
}