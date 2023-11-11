import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const Navbar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        router.push(`/apps?search=${searchQuery}`);
    };

    return (
        <>
        <nav className="flex items-center flex-wrap bg-slate-700 p-3 w-screen opacity-90">
        <a href="/">
            <h1 className='text-white text-xl font-bold'>NexuStore</h1>
        </a>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto pr-3">
            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                <a href="/" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Home
                </a>
                <a href="/apps" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Apps
                </a>
                <a href="/" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Develop
                </a>
                <a href="/" className="lg:inline-flex lg:w-auto w-full px-2 py-1 rounded text-white font-bold items-center justify-center hover:bg-slate-400 hover:text-white">
                    Profile
                </a>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="px-2 py-1 border rounded-md"
                    />
                    <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md">
                        Search
                    </button>
                </div>
            </div>
        </div>
        </nav>
        </>
    )
}