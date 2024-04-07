// import clientPromise from "@/db/mongodb";

// export async function GET(req, res) {
//   try {
//     const client = await clientPromise
//     const db = client.db("sample_mflix")
//     const movies = await db.collection("movies").find({}).limit(100).toArray()
//     return new Response(JSON.stringify(movies))
//   } catch (e) {
//     console.error(e.message)
//   }
// }