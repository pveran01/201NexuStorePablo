import { Double, ObjectId } from "mongodb";

export interface MobileApp {
    id: string;
    name: string;
    developer: string;
    image: string;
    reviews: Double;
    ratingTotal: Double;
    rating: Double;
    popularity: Double;
    description: string;
    comments: string[];
    platforms: string[];
}

export interface MAppProps {
    app: MobileApp;
}

const MApp: React.FC<MAppProps> = ({app}) => {
    return (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <img src={app.image} className="w-full"/>
          <div className="px-6 py-4">
            <p className="font-bold text-xl mb-0 underline">{app.name}</p>
            <p className="font-bold text-m mb-2">{app.developer}</p>
            <p className="text-gray-700 text-base">{app.description}</p>
            <p className="font-bold text-yellow-500">{app.rating}</p>
        </div>
        </div>
    )
}

export default MApp;

/*
<ul>
    {app.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
    ))}
</ul>
*/