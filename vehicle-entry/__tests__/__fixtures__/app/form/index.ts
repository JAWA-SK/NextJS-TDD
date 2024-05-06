import { EntryFormType } from '@/app/types/vehicle-type'
import { faker } from '@faker-js/faker'

export const mockVehicleDetails: EntryFormType = {
    driverName: faker.person.firstName(),
    plateNumber: faker.vehicle.vin(),
    entryTime: String(faker.date.anytime()),
    exitTime: String(faker.date.anytime()),
    vehicleType: faker.vehicle.type(),
    phoneNumber: Number(faker.phone.number())
}

export const invalidMockForDriverName = {
    driverName: faker.lorem.word().charAt(0).toUpperCase()
}

export const invalidMockForPhoneNumber = {
    phoneNumber: faker.string.alpha() + faker.number.int()
}

export const invalidMockForPlateNumber = {
    plateNumber: faker.number.int()
}
