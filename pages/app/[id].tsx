import { useRouter } from "next/router";
import { ObjectId } from 'mongodb';
import clientPromise from "../../lib/mongodb";
import { MobileApp } from "../../components/MobileApp";
import { GetStaticProps, GetStaticPaths } from "next";
import SearchBar from '../../components/SearchBar';

function AppDetailsPage({ app }: {app: MobileApp }) {
    const router = useRouter()
    
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{app.name} Details</h1>
        </div>
    );
}

export async function getStaticPaths() {
    const client = await clientPromise;
    const db = client.db("NexuStore");

    const apps = await db.collection("name").find( {} ).toArray();

    const paths = apps.map((app) => ({ params: { id : app._id.toString() }}));

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

    const app = await db.collection("name").find( {name: {$regex: /test/i}} );

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