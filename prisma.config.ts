import "dotenv/config";

export default {
  schema: "prisma/schema.prisma",
  db: {
    url: process.env.DATABASE_URL!,
  },
};