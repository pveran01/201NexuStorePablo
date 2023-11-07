import React from 'react';
import { useRouter } from "next/router";
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import { GetStaticProps, GetStaticPaths } from "next";
import { Navbar } from '../../components/Navbar';
import { ObjectId } from 'mongodb';

type Props = {
    app: MobileApp;
}

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
            <div className='overflow-hidden rounded-lg text-left' style={{ marginLeft: '64px' }}>
                <div className='flex'>
                    <div className='w-3/4 p-4' style={{ marginTop: '80px'}}>
                        <p style={{ fontSize: '75px' }}>{app.name}</p>
                        <p style={{ fontSize: '20px' }}>{app.developer}</p>
                        <p> 
                            { Number(app.rating).toFixed(1) }
                            <span role='img' aria-label='star'>⭐</span> 
                        </p>
                    </div>
                    <div className='w-3/4' style={{ marginRight: '70px' }}>
                        <img src={app.image} className='mx-auto rounded-lg' style={{ width: '250px', height: '250px', marginTop: '70px'}} />
                    </div>
                </div>
            </div>
            <div className='overflow-hidden rounded-lg text-left' style={{ marginTop: '30px', marginLeft: '80px' }}>
                <p style={{ fontSize: '30px' }}>About this app:</p>
                <p style={{ fontSize: '20px' }}>{app.description}</p>
            </div>
            <div className='overflow-hidden rouned-lg text-left' style={{ marginTop: '20px', marginLeft: '80px' }}>
                <p style={{ fontSize: '30px' }}>Comments: </p>
                <p style={{ fontSize: '20px' }}>
                    {app.comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            {comment}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("Apps").find({}).toArray();

    const paths = apps.map((app) => ({
        params: { id: app._id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<Props> = async ( { params }) => {
    if(!params?.id) {
        return {
            notFound: true,
        };
    }

    const id = params.id as string;

    const client = await clientPromise;
    const db = client.db("NexuStore");

    const app = await db.collection("Apps").findOne({ _id: new ObjectId(id) } );

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