import { generateToken, verifyToken } from "../../security/auth/auth.service"

test("token generation and verification", () => {

 const token = generateToken("user123")

 const decoded = verifyToken(token)

 expect(decoded).toBeDefined()

})
