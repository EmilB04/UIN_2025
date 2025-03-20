export function slugifier(input) {
    input.toLowerCase().replace("&", "and").replace(/\s+/g, "-").replace(/[^a-z0-9- ]/g, "")
    return input
}