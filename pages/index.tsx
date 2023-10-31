import React from 'react';
import clientPromise from "../lib/mongodb";
import { MobileApp } from "../components/MobileApp";
import MApp from '../components/MobileApp';
import { Navbar } from '../components/Navbar';


export interface HomeProps {
  apps: MobileApp[];
}

const Home: React.FC<HomeProps> = ({apps}) => {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-slate-900 flex items-center justify-center flex-col">
        <h1 className="font-bold text-9xl text-center text-white">NexuStore</h1>
        <h1 className="font-bold text-3xl text-center text-white">Slogan goes here</h1>
      </div>
      <div className="bg-slate-300">
        <div>
          <h1 className="underline font-bold text-2xl pt-2">Popular Apps:</h1>
        </div>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {apps.map((app) => {
          return(
            <div key={app.id}>
              <MApp app = {app}/>
            </div>
          )
        })}
        </div>
      </div>
      
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find({name: {$regex: /test/i }}).limit(3).sort({rating: -1}).toArray();
    return {
      props: {
        apps: JSON.parse(JSON.stringify(apps))
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default Home;
