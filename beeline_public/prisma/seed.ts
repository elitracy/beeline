import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {

  //Create a test passenger seed
  const passenger1 = await prisma.passenger.create({
    data: {
      email: "john@example.com",
      password: {
        create: {
          hash: await bcrypt.hash("password", 10)
        }
      },
      name: "John Doe",
      airports: {
        create: [
          { name: "DEN", city: "Houston", state: "TX", country: "USA" },
          { name: "DFW", city: "Reno", state: "NV", country: "USA" },
          { name: "IAH", city: "Seattle", state: "WA", country: "USA" },
          { name: "ATL", city: "San Fransisco", state: "CA", country: "USA" }
        ]
      },
      airplanes: {
        create: [
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "DEN" }, { name: "DFW" }]
            },
          },
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "DFW" }, { name: "IAH" }]
            },
          },
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "IAH" }, { name: "ATL" }]
            },
          }
        ]
      },

    }
  })

  const passenger2 = await prisma.passenger.create({
    data: {
      email: "jane@example.com",
      password: {
        create: {
          hash: await bcrypt.hash("password", 10)
        }
      },
      name: "Jane Doe",
      airports: {
        create: [
          { name: "LAX", city: "Los Angeles", state: "CA", country: "USA" },
          { name: "JFK", city: "New York", state: "NY", country: "USA" }
        ]
      },
      airplanes: {
        create: [
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "LAX" }, { name: "JFK" }]
            },
          }
        ]
      },

    }
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
