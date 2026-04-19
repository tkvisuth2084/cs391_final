import { Pet } from "../types/pet";


export default function PetCard({ pet }: { pet: Pet }) {
    return (
        <div style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            background: "white",
            height: 450,
            cursor: "grab",
        }}>
            <img

                src={pet.attributes.pictureThumbnailUrl || "/placeholder.jpg"}
                alt={pet.attributes.name} // For accessibility / screen readers
                style={{ width: "100%", height: 300, objectFit: "cover" }} // "cover" = fill box without stretching
            />

            <div style={{ padding: "1rem" }}>
                <h2 style={{ margin: 0 }}>{pet.attributes.name}</h2>
                <p style={{ color: "#666" }}>
                    {pet.attributes.breedPrimary} • {pet.attributes.ageGroup} • {pet.attributes.sex}
                </p>
            </div>
        </div>
    );
}