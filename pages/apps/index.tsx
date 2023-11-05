import React, { useEffect, useState } from 'react';
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import SmallApp from "../../components/SmallApp"
import { Navbar } from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';


export interface AppsProps {
  apps: MobileApp[];
}


const appsPage: React.FC<AppsProps> = ({apps}) => {
  const [filteredApps, setFilteredApps] = useState<MobileApp[]>([]);

  useEffect(() => {
    setFilteredApps(apps);
  }, [apps]);

  const handleSearch = (query: string) => {
    console.log('Before filtering:', apps);
    if (!query) {
      setFilteredApps(apps); 
    } else {
      const filtered = apps.filter((app) =>
        app.name.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
      setFilteredApps(filtered);
        console.log('After filtering:', filtered);

    }
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const sortValue = e.target.value;
  };

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-xl">Apps Page</h1>
      <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar */}
      {/* Render the filtered apps */}
      {/* ... rest of the component */}
      {filteredApps.map((app) => {
        // ... render the app
      })}
      {/* ... */}      {/* Render the filtered apps */}
      <label htmlFor="sort">Sort by:</label> 
      <select name="sort" id="sort"> 
        <option value="Rating">Rating</option> 
        <option value="Popularity">Popularity</option> 
        <option value="Alphabetically">Alphabetically</option> 
      </select>
      <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-5">
      {filteredApps.map((app) => {
        return(
          <div key={app.id}>
            <SmallApp app = {app}/>
          </div>
        )
      })}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find({name: {$regex: /test/i }}).sort({name: -1}).toArray();
    return {
      props: {
        apps: JSON.parse(JSON.stringify(apps))
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default appsPage;
