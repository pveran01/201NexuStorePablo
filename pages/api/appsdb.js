import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("NexuStore");

        const apps = await db
            .collection("Apps")
            .find({})
            .toArray();

        res.json(apps);
    } catch (e) {
        console.error(e);
    }
};