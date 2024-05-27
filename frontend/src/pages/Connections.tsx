import React, { useState } from 'react';

export default function Connections() {
    const categories = [
        { category: 'Category 1', words: ['SIGMA', 'MEW', 'GYM', 'GYATT'] },
        { category: 'Category 2', words: ['LOL1', 'word6', 'word7', 'word8'] },
        { category: 'Category 3', words: ['word9', 'word10', 'word11', 'word12'] },
        { category: 'Category 4', words: ['word13', 'word14', 'word15', 'word16'] }
    ];

    const [selectedWords, setSelectedWords] = useState([]);
    const [colors, setColors] = useState({});

    const handleClick = (word, category) => {

    };

    return (
        <div className="grid grid-cols-1 justify-items-center">
            <h1 className="pt-10 text-black mt-2 mb-5">Connections</h1>
            <div className="grid grid-cols-4 gap-4 justify-items-center h-[500px] w-[800px]">
                {categories.map((category, catIndex) => (
                    category.words.map((word, wordIndex) => (
                        <div
                            key={`${catIndex}-${wordIndex}`}
                            className={`${colors[word] || 'bg-gray-200'} h-full w-full mt-5 mb-5 text-center flex items-center justify-center rounded-md cursor-pointer`}
                            onClick={() => handleClick(word, category.category)}
                        >
                            {word}
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
}
