import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  
  //Create a test passenger seed
  const passenger1 = await prisma.passenger.create({
    data: {
      email: "jane@example.com",
      password: {
        create:{
          hash: "password"
        }
      },
      name: "Jane Smith",
      airports: {
        create: [
          { name: "SFO", city: "San Francisco", state: "CA", country: "USA" },
          { name: "JFK", city: "New York", state: "NY", country: "USA" }
        ]
      },
      airplanes: {
        create: [
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "SFO" }, { name: "JFK" }]
            },
            seats: {
              create: [
                { seat_number: 1, seat_row: 1, seat_class: "economy" },
                { seat_number: 2, seat_row: 1, seat_class: "economy" }
              ]
            }
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
