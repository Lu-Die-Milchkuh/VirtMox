import { $ } from "bun"

// PAM might be a better way, but most node packages are broken, so instead run this
// "very secure" script
export async function login(ctx) {
    const { username, password } = ctx.body
    const result =
        await $`./src/scripts/checkCredentials.sh ${username} ${password}`

    console.log("Here")
    if (result.exitCode !== 0) {
        ctx.set.status = 401
        return
    }

    const token = await ctx.jwt.sign(username)
    console.log(`new Token: ${token}`)

    return {
        token: token
    }
}
