import { client } from "./client";

export async function fetchAllUsers() {
    try {
        const data = await client.fetch(`*[_type == "user"]{
            _id,
            firstName,
            lastName,
            password,
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
                apiId,
                image,
                title,
            },
            wishlist[]->{
                _id,
                name
            },

            friends[]->{
                _id,
                firstName,
                lastName,
                wishlist[]->{
                    _id,
                    apiId,
                    image,
                    title,
                },
                photo{
                    asset->{
                        url
                    }
                }
            }
        }`);
        return data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}

export async function fetchUserById(_id) {
    try {
        const data = await client.fetch(`*[_type == "user" && _id == $_id][0]{
            _id,
            firstName,
            lastName,
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
                apiId,
                image,
                title,
                date,
                time,
                country,
                city,
                venue,
            },
            wishlist[]->{
                _id,
                apiId,
                image,
                title,
                date,
                time,
                country,
                city,
                venue,
            },
            friends[]->{
                _id,
                firstName,
                lastName,
                wishlist[]->{
                    _id,
                    title,
                    apiId,
                },
                photo{
                    asset->{
                        url
                    }
                }
            }
        }`, { _id });
        return data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}

export async function fetchUsersWithCommonEvents(eventId) {
    try {
        const data = await client.fetch(`*[_type == "user" && references($eventId)]{
            _id,
            firstName,
            lastName,
            password,
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
                apiId,
                image,
                title,
                date,
                time,
                country,
                city,
                venue,
            },
            wishlist[]->{
                _id,
                name
            },

            friends[]->{
                _id,
                firstName,
                lastName,
                wishlist[]->{
                    _id,
                    apiId,
                    image,
                    title,
                    date,
                    time,
                    country,
                    city,
                    venue,
                },
                photo{
                    asset->{
                        url
                    }
                }
            }
        }`, { eventId });
        return data;
    }
    catch (error) {
        console.error("Error fetching users with common events:", error);
        throw error;
    }
}