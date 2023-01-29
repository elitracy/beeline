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
          { name: "LAX", city: "Los Angeles", state: "CA", country: "USA" },
          { name: "PHX", city: "Phoenix", state: "AZ", country: "USA" },
          { name: "MSP", city: "Minneapolis", state: "MN", country: "USA" },
          { name: "DFW", city: "Dallas", state: "TX", country: "USA" }
        ]
      },
      airplanes: {
        create: [
    
          {
            departure_time: new Date("2023-01-28T08:38:00.000Z"),
            arrival_time: new Date("2023-01-28T03:15:40.000Z"),
            airports: {
              connect: [{ name: "LAX" }, { name: "PHX" }]
            }
           
          },
          {
            departure_time: new Date("2023-01-28T08:38:00.000Z"),
            arrival_time: new Date("2023-01-28T05:20:00.000Z"),
            airports: {
              connect: [{ name: "PHX" }, { name: "MSP" }]
            }
           
          },
          {
            departure_time: new Date("2023-01-28T07:55:17.142Z"),
            arrival_time: new Date("2023-01-28T09:55:17.142Z"),
            airports: {
              connect: [{ name: "MSP" }, { name: "DFW" }]
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
