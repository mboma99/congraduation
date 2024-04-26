import React from 'react';

const UniversitySelect = ({ value, onChange }) => {
    const options = [
        { value: "", label: "Select University" },
        { value: "1", label: "De Montfort University" },
        { value: "2", label: "Staffordshire University" },
        { value: "3", label: "Nottingham Trent University" },
        { value: "4", label: "Birmingham University" }
    ];

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);
    };

    return (
        <select
            className='mb-4 block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
            value={value}
            onChange={handleSelectChange}
        >
            {options.map((data) => {
                return (
                    <option key={data.value} value={data.value}>
                        {data.label}
                    </option>
                );
            })}
        </select>
    );
};

export default UniversitySelect;
