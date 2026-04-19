"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PawSwipe() {
    const { data, error } = useSWR("/api/pet", fetcher);

    if (error) return <h2>Error</h2>;
    if (!data) return <h2>Loading...</h2>;

    return (
        <div>
            {data.map((pet: any) => (
                <div key={pet.id}>
                    <img src={pet.attributes.pictureThumbnailUrl} alt={pet.attributes.name} />
                    <h3>{pet.attributes.name}</h3>
                </div>
            ))}
        </div>
    );
}