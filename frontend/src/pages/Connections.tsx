import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";

type Category = {
    category: string;
    words: string[];
};

type ColorState = {
    [key: string]: string;
};

// shuffle the arry
const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Connections: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const categories: Category[] = [
        { category: 'Category 1', words: ['SIGMA', 'MEW', 'GYM', 'GYATT'] },
        { category: 'Category 2', words: ['COMPUTER', 'HEADPHONES', 'PHONE', 'EARPHONES'] },
        { category: 'Category 3', words: ['JAMES', 'JOHN', 'JAKE', 'JEFF'] },
        { category: 'Category 4', words: ['RICE', 'PASTA', 'POOP', 'POTATO'] }
    ];

    const allWords = categories.flatMap(category => category.words);

    const initialColors: ColorState = allWords.reduce((acc, word) => {
        acc[word] = 'bg-gray-200';
        return acc;
    }, {} as ColorState);

    // hooks
    const [colors, setColors] = useState<ColorState>(initialColors);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<{ word: string, category: string }[]>([]);

    useEffect(() => {
        setShuffledWords(shuffleArray(allWords));
    }, []); 

    const handleClick = (word: string, category: string) => {
      
        if (selectedWords.some(selected => selected.word === word)) return;

        const newSelectedWords = [...selectedWords, { word, category }];
        setSelectedWords(newSelectedWords);

        if (newSelectedWords.length === 4) {
            const allSameCategory = newSelectedWords.every(item => item.category === newSelectedWords[0].category);
            const newColors = { ...colors };

            newSelectedWords.forEach(({ word }) => {
                newColors[word] = allSameCategory ? 'bg-green-500' : 'bg-red-500';
            });

            setColors(newColors);
            setSelectedWords([]); 
        } else {
            setColors(prevColors => ({
                ...prevColors,
                [word]: 'bg-gray-500'
            }));
        }
    };

    const allGreen = Object.values(colors).every(color => color === 'bg-green-500');

    return (
        <div className='bg-Blue1 min-h-screen pb-14'>
            <Navbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
            <AnimatePresence>{isSidebarOpen && <Sidebar />}</AnimatePresence>
            <div className="grid grid-cols-1 justify-items-center">
            <div className='flex justify-center items-center text-[30px] text-Blue2 font-bold font-Inter rounded-md bg-Green1 px-16 mt-12 py-6 mb-10'>Connections</div>

                {/* <h1 className="pt-10 text-black mt-2 mb-5">Connections</h1> */}
                <div className="grid grid-cols-4 gap-4 justify-items-center h-[500px] w-[800px]">
                    {shuffledWords.map((word) => (
                        <div
                            key={word}
                            className={`${colors[word]} h-full w-full mt-5 mb-5 text-center flex items-center justify-center rounded-md cursor-pointer`}
                            onClick={() => {
                                const category = categories.find(category => category.words.includes(word))?.category || '';
                                handleClick(word, category);
                            }}
                        >
                            {word}
                        </div>
                    ))}
                </div>
                {allGreen && <p className='mt-10'>Congratulations! You completed it!</p>}
            </div>
        </div>
    );
};

export default Connections;
