import React from 'react';
import clientPromise from "../lib/mongodb";
import { MobileApp } from "../components/MobileApp";
import MApp from '../components/MobileApp';


export interface HomeProps {
  apps: MobileApp[];
}

const Home: React.FC<HomeProps> = ({apps}) => {
  return (
    <>
      <h1 className="font-bold text-xl">Home Page</h1>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {apps.map((app) => {
        return(
          <div key={app.id}>
            <MApp app = {app}/>
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

    const apps = await db.collection("Apps").find({}).toArray();
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
