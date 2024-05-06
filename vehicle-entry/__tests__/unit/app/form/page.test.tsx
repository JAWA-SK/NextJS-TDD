import { FormLabels, FormPlaceHolders, InputLabels } from '@/app/constant/form-constant'
import { FormValidationConstants } from '@/app/constant/form-validation-constant'
import EntryFormPage from '@/app/form/page'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import {
    invalidMockForDriverName,
    invalidMockForPhoneNumber,
    invalidMockForPlateNumber,
    mockVehicleDetails
} from '../../../__fixtures__/app/form'

describe('should render a form components', () => {
    it('should render a labels', () => {
        render(<EntryFormPage />)
        expect(screen.getByText(FormLabels.ENTRY_TIME)).toBeInTheDocument()
        expect(screen.getByText(FormLabels.DRIVER_NAME)).toBeInTheDocument()
        expect(screen.getByText(FormLabels.EXIT_TIME)).toBeInTheDocument()
        expect(screen.getByText(FormLabels.PHONE_NUMBER)).toBeInTheDocument()
        expect(screen.getByText(FormLabels.VEHICLE_TYPE)).toBeInTheDocument()
    })

    it('should render a submit button for a form', () => {
        render(<EntryFormPage />)
        expect(screen.getByText(InputLabels.SUBMIT_FORM)).toBeInTheDocument()
    })

    it('should render all place holders in the form', () => {
        render(<EntryFormPage />)
        expect(screen.getByPlaceholderText(FormPlaceHolders.DRIVER_NAME)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FormPlaceHolders.PHONE_NUMBER)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FormPlaceHolders.PHONE_NUMBER)).toBeInTheDocument()
    })

    it('should display error messages when values is not provided', async () => {
        render(<EntryFormPage />)

        const submitButton = screen.getByRole(InputLabels.BUTTON, {
            name: InputLabels.SUBMIT_FORM
        })
        fireEvent.click(submitButton)
        const driverNameError = await screen.findByText(FormValidationConstants.MISSING_DRIVER_NAME)
        const plateNumberError = await screen.findByText(
            FormValidationConstants.MISSING_VEHICLE_TYPE
        )
        const phoneNoError = await screen.findByText(FormValidationConstants.MISSING_PHONE_NO)

        expect(driverNameError).toBeInTheDocument()
        expect(plateNumberError).toBeInTheDocument()
        expect(phoneNoError).toBeInTheDocument()
    })

    it('should render a text for invalid value in the form component fields', async () => {
        render(<EntryFormPage />)

        const invalidDataForDriverName = invalidMockForDriverName.driverName
        const invalidDataForPlateNumber = invalidMockForPlateNumber.plateNumber
        const invalidDataForPhoneNumber = invalidMockForPhoneNumber.phoneNumber

        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.DRIVER_NAME), {
            target: { value: invalidDataForDriverName }
        })
        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.PLATE_NUMBER), {
            target: { value: invalidDataForPlateNumber }
        })
        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.PHONE_NUMBER), {
            target: { value: invalidDataForPhoneNumber }
        })

        const submitButton = screen.getByRole(InputLabels.BUTTON, {
            name: InputLabels.SUBMIT_FORM
        })
        fireEvent.click(submitButton)
        const driverNameError = await screen.findByText(
            FormValidationConstants.DRIVER_NAME_VALIDATION
        )
        const plateNumberError = await screen.findByText(
            FormValidationConstants.MISSING_PLATE_NUMBER
        )
        const phoneNoError = await screen.findByText(FormValidationConstants.MISSING_PHONE_NO)

        expect(driverNameError).toBeInTheDocument()
        expect(plateNumberError).toBeInTheDocument()
        expect(phoneNoError).toBeInTheDocument()
    })

    it('should render select fields in a form', async () => {
        const mockFormData = mockVehicleDetails
        render(<EntryFormPage />)
        const selectService = screen.getAllByRole(InputLabels.COMBO_BOX)
        fireEvent.click(selectService[0])
        const selectedService = screen.getByRole(InputLabels.OPTION, {
            name: mockFormData.vehicleType
        })

        fireEvent.click(selectedService)

        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.DRIVER_NAME), {
            target: { value: mockFormData.driverName }
        })

        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.PHONE_NUMBER), {
            target: { value: mockFormData.phoneNumber }
        })

        fireEvent.change(screen.getByPlaceholderText(FormPlaceHolders.PLATE_NUMBER), {
            target: { value: mockFormData.plateNumber }
        })

        const submitButton = screen.getByText(InputLabels.SUBMIT_FORM)
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect('submitted').toBeInTheDocument()
        })
    })
})
