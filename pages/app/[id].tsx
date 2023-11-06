import React from 'react';
import { useRouter } from "next/router";
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import MApp from '../../components/MobileApp';
import { GetStaticProps, GetStaticPaths } from "next";
import { Navbar } from '../../components/Navbar';

function AppDetailsPage({ app }: {app: MobileApp }) {
    const router = useRouter()
    
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='fixed'>
                <Navbar />
            </div>
            <div className='overflow-hidden shadow-lg rounded-lg text-center'>
                <img src={app.image} className='w-1/2 mx-auto rounded-lg'/>
                <p>Name: {app.name}</p>
                <p>Developer: {app.developer}</p>
                <p>Raitng: {app.rating}</p>
                <p>Description: {app.description}</p>
                <p>Comments: {app.comments}</p>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find({name: {$regex: /test/i}}).toArray();

    const paths = apps.map((app) => ({
        params: {
            id : app.name,
        },
    }));

    return {
        paths,
        fallback: true,
    };
}

type Props = {
    app: MobileApp;
}

export const getStaticProps: GetStaticProps<Props> = async( { params }) => {
    if(!params?.id) {
        return {
            notFound: true,
        };
    }

    const id = params.id as string;

    const client = await clientPromise;
    const db = client.db("NexuStore");

    const app = await db.collection("Apps").findOne( {name: {$regex: "test", $options: "i"}} );

    if(!app) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            app: JSON.parse(JSON.stringify(app)),
        },
    };
}

export default AppDetailsPage