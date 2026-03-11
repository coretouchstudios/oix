import { encrypt, decrypt } from "../../security/encryption/encryption.util"

test("encryption and decryption", () => {

 const text = "hello-oix"

 const encrypted = encrypt(text)

 const decrypted = decrypt(encrypted)

 expect(decrypted).toBe(text)

})
