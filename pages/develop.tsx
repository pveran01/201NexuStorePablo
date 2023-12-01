import { useState } from "react";
import { Navbar } from "../components/Navbar"
import { useRouter } from "next/router";

const developPage = () => {
    const [appName, setAppName] = useState('');
    const [developerName, setDeveloperName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [platforms, setPlatforms] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const reviews = 0;
    const ratingTotal = 0;
    const rating = 0;
    const popularity = 0;
    const comments: string[] = [];

    const handleDeveloper = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/submitApp', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({appName, developerName, image, rating, description, comments, platforms})
            });

            if(response.ok) {
                alert('Submission Recieved!');
                router.push('/');
            } else {
                alert('Submission Failed!');
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('submission failed', error);
            setError('An Unexpected Error Occured');
        }
    };

    return (
    <>
        <Navbar />
        <div>
            <h1>Submit an Application Request</h1>
            <form onSubmit={handleDeveloper}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Developer:</label>
                    <input
                        type="text"
                        value={developerName}
                        onChange={(e) => setDeveloperName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image Link:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Platforms:</label>
                    <select name='platforms' multiple onChange={(e) => setPlatforms(e.target.value)}>
                        <option value='apple'>Apple</option>
                        <option value='android'>Android</option>
                        <option value='windows'>Windows</option>
                    </select>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Submit</button>
            </form>
        </div>
    </>
    )
};

export default developPage;