import { client } from "./client";

export async function fetchAllUsers() {
    const data = await client.fetch( `*[_type == "user"]{
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
        },
        wishlist[]->{
        },
    }`);
    return data;
}

export async function fetchUserById(userId) {
    const data = await client.fetch(`*[_type == "user" && userId.current == $userId][0]{
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
        },
        wishlist[]->{
        },
    }`, { userId });
    return data;
}

