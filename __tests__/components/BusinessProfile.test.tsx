import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BusinessProfile from '@/components/BusinessProfile';
import { describe, it, expect, vi } from 'vitest';
import { Business } from '@/types/business';

describe('BusinessProfile Component', () => {
    const mockBusiness: Business = {
        id: 1,
        name: 'Test Restaurant',
        description: 'A test restaurant',
        address: 'Test Address',
        phone: '1234567890',
        businessType: 'restaurant',
        services: ['food', 'delivery'],
        workingHours: {
            monday: { open: '09:00', close: '21:00' },
            tuesday: { open: '09:00', close: '21:00' }
        }
    };

    it('renders business information correctly', () => {
        render(<BusinessProfile business={mockBusiness} />);
        
        expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
        expect(screen.getByText('A test restaurant')).toBeInTheDocument();
        expect(screen.getByText('Test Address')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
    });

    it('renders working hours correctly', () => {
        render(<BusinessProfile business={mockBusiness} />);
        
        expect(screen.getByText('ساعات کاری')).toBeInTheDocument();
        expect(screen.getByText('دوشنبه: 09:00 - 21:00')).toBeInTheDocument();
        expect(screen.getByText('سه‌شنبه: 09:00 - 21:00')).toBeInTheDocument();
    });

    it('displays services correctly', () => {
        render(<BusinessProfile business={mockBusiness} />);
        
        expect(screen.getByText('خدمات')).toBeInTheDocument();
        expect(screen.getByText('غذا')).toBeInTheDocument();
        expect(screen.getByText('تحویل')).toBeInTheDocument();
    });

    it('allows editing business information when user is owner', () => {
        const mockOnSave = jest.fn();
        render(
            <BusinessProfile
                business={mockBusiness}
                isOwner={true}
                onSave={mockOnSave}
            />
        );

        const editButton = screen.getByText('ویرایش');
        fireEvent.click(editButton);

        const nameInput = screen.getByLabelText('نام کسب و کار');
        fireEvent.change(nameInput, { target: { value: 'New Restaurant Name' } });

        const saveButton = screen.getByText('ذخیره');
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledWith({
            ...mockBusiness,
            name: 'New Restaurant Name'
        });
    });
}); 