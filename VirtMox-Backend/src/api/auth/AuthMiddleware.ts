// TODO: Find out why this style of middleware no longer works like this
// This somehow causes "Duplicate Content-Length" property in the response header
export async function auth(ctx) {
    if (!ctx.bearer) {
        ctx.set.status = 400

        return {
            status: "Unauthorized!",
            message: "Missing Bearer Token!"
        }
    }

    try {
        const profile = await ctx.jwt.verify(
            ctx.bearer,
            Bun.env.JWT_SECRET || "th1s1sv3rystr0ng420$"
        )

        if (!profile) {
            ctx.set.status = 400

            return {
                status: "Unauthorized!",
                message: "Bearer Token invalid!"
            }
        }
    } catch (err) {
        console.log(err)
        ctx.set.status = 500
        return {
            status: "Internal Error!",
            message: "Please try again later!"
        }
    }
}
