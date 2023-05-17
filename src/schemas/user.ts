export const UserSchema = {
  title: "User",
  additionalProperties: false,
  type: "object",
  properties: {
    role: {
      type: "string"
    }
  },
  "required": ["role"]
}
