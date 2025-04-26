import { client } from "./client";

export async function fetchAllUsers() {
    try {
        const data = await client.fetch(`*[_type == "user"]{
            _id,
            firstName,
            lastName,
            userId,
            photo{
                asset->{
                    _id,
                    url
                }
            },
            email,
            phone,
            gender,
            age,
            previousPurchases[]->{
                _id,
                title
            },
            wishlist[]->{
                _id,
                name
            },
        }`);
        return data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

export async function fetchUserById(userId) {
    try {
        const data = await client.fetch(`*[_type == "user" && userId == $userId][0]{
            _id,
            firstName,
            lastName,
            userId,
            photo{
                asset->{
                    _id,
                    url
                }
            },
            email,
            phone,
            gender,
            age,
            previousPurchases[]->{
                _id,
                title
            },
            wishlist[]->{
                _id,
                name
            },
        }`, { userId });
        return data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}
