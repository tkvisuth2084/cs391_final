export async function GET() {
    const res = await fetch("https://api.rescuegroups.org/v5/public/animals/search/available/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.RESCUEGROUPS_API_KEY!,
        },
        body: JSON.stringify({
            data: { filterRadius: { miles: 25, postalcode: "02215" } }
        }),
    });

    const data = await res.json();
    console.log(JSON.stringify(data.data?.[0], null, 2));
    return Response.json(data.data ?? []);
}