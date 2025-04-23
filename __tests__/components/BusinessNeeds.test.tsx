import { render, screen, fireEvent } from '@testing-library/react';
import BusinessNeeds from '@/components/BusinessNeeds';

interface Business {
    id: number;
    name: string;
    type: string;
}

interface Need {
    id: number;
    title: string;
    description: string;
    business: Business;
    category: string;
    createdAt: string;
}

describe('BusinessNeeds Component', () => {
    const mockNeeds: Need[] = [
        {
            id: 1,
            title: 'نیاز به نیروی کار',
            description: 'به دنبال یک آشپز حرفه‌ای با سابقه کار در رستوران‌های لوکس',
            business: {
                id: 1,
                name: 'رستوران نمونه',
                type: 'restaurant'
            },
            category: 'employment',
            createdAt: '2024-02-20T10:00:00Z'
        },
        {
            id: 2,
            title: 'خرید تجهیزات',
            description: 'به دنبال خرید دستگاه قهوه‌ساز صنعتی دست دوم',
            business: {
                id: 2,
                name: 'کافی‌شاپ نمونه',
                type: 'cafe'
            },
            category: 'equipment',
            createdAt: '2024-02-19T15:30:00Z'
        }
    ];

    it('renders list of needs correctly', () => {
        render(<BusinessNeeds needs={mockNeeds} />);

        expect(screen.getByText('نیاز به نیروی کار')).toBeInTheDocument();
        expect(screen.getByText('خرید تجهیزات')).toBeInTheDocument();
        expect(screen.getByText('رستوران نمونه')).toBeInTheDocument();
        expect(screen.getByText('کافی‌شاپ نمونه')).toBeInTheDocument();
    });

    it('filters needs by category', () => {
        render(<BusinessNeeds needs={mockNeeds} selectedCategory="employment" />);

        expect(screen.getByText('نیاز به نیروی کار')).toBeInTheDocument();
        expect(screen.queryByText('خرید تجهیزات')).not.toBeInTheDocument();
    });

    it('allows creating new need', () => {
        const mockOnCreate = jest.fn();
        render(<BusinessNeeds needs={mockNeeds} onCreate={mockOnCreate} />);

        const createButton = screen.getByText('ثبت نیاز جدید');
        fireEvent.click(createButton);

        const titleInput = screen.getByLabelText('عنوان نیاز');
        const descriptionInput = screen.getByLabelText('توضیحات');
        const categorySelect = screen.getByLabelText('دسته‌بندی');

        fireEvent.change(titleInput, { target: { value: 'نیاز جدید' } });
        fireEvent.change(descriptionInput, { target: { value: 'توضیحات نیاز جدید' } });
        fireEvent.change(categorySelect, { target: { value: 'other' } });

        const submitButton = screen.getByText('ثبت');
        fireEvent.click(submitButton);

        expect(mockOnCreate).toHaveBeenCalledWith({
            title: 'نیاز جدید',
            description: 'توضیحات نیاز جدید',
            category: 'other'
        });
    });

    it('displays empty state when no needs are available', () => {
        render(<BusinessNeeds needs={[]} />);

        expect(screen.getByText('نیازی ثبت نشده است')).toBeInTheDocument();
    });

    it('allows searching needs', () => {
        render(<BusinessNeeds needs={mockNeeds} />);

        const searchInput = screen.getByPlaceholderText('جستجوی نیازها...');
        fireEvent.change(searchInput, { target: { value: 'نیروی کار' } });

        expect(screen.getByText('نیاز به نیروی کار')).toBeInTheDocument();
        expect(screen.queryByText('خرید تجهیزات')).not.toBeInTheDocument();
    });

    it('displays needs in chronological order', () => {
        render(<BusinessNeeds needs={mockNeeds} />);

        const needItems = screen.getAllByTestId('need-item');
        expect(needItems[0]).toHaveTextContent('نیاز به نیروی کار');
        expect(needItems[1]).toHaveTextContent('خرید تجهیزات');
    });
}); 