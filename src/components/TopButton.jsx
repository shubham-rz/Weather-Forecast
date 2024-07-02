import React from 'react';

const TopButton = ({setquery}) => {
    
    const cities = [
        {
            id: 1,
            name: 'Delhi',
        },
        {
            id: 2,
            name: 'london',
        },
        {
            id: 3,
            name: 'Goa',
        },
        {
            id: 4,
            name: 'Kerala',
        },
        {
            id: 5,
            name: 'Patna',
        },
    ];

    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button
                    key={city.id}
                    className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'
                    onClick={() => setquery({ q: city.name })}
                    >
                    {city.name}
                </button>
            ))}
        </div>
    );
};

export default TopButton;
