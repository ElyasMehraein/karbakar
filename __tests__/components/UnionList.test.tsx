import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import UnionList from '../../components/UnionList';
import { Union } from '../../types/union';

describe('UnionList', () => {
  const mockUnions: Union[] = [
    {
      id: 1,
      name: 'اتحادیه صنف رستوران‌داران',
      description: 'اتحادیه رسمی رستوران‌داران تهران',
      members: 150,
      establishedDate: '1390/01/01',
    },
    {
      id: 2,
      name: 'اتحادیه صنف کافیشاپ‌ها',
      description: 'اتحادیه رسمی کافیشاپ‌های تهران',
      members: 80,
      establishedDate: '1395/05/15',
    },
  ];

  test('renders union list correctly', () => {
    render(<UnionList unions={mockUnions} />);

    expect(screen.getByText('اتحادیه صنف رستوران‌داران')).toBeInTheDocument();
    expect(
      screen.getByText('اتحادیه رسمی رستوران‌داران تهران')
    ).toBeInTheDocument();
    expect(screen.getByText('150 عضو')).toBeInTheDocument();
    expect(screen.getByText('تاسیس: 1390/01/01')).toBeInTheDocument();

    expect(screen.getByText('اتحادیه صنف کافیشاپ‌ها')).toBeInTheDocument();
    expect(
      screen.getByText('اتحادیه رسمی کافیشاپ‌های تهران')
    ).toBeInTheDocument();
    expect(screen.getByText('80 عضو')).toBeInTheDocument();
    expect(screen.getByText('تاسیس: 1395/05/15')).toBeInTheDocument();
  });

  test('calls onJoin when join button is clicked', () => {
    const handleJoin = jest.fn();
    render(<UnionList unions={mockUnions} onJoin={handleJoin} />);

    const joinButtons = screen.getAllByText('عضویت');
    fireEvent.click(joinButtons[0]);

    expect(handleJoin).toHaveBeenCalledWith(mockUnions[0].id);
  });

  it('displays union details when clicked', () => {
    render(<UnionList unions={mockUnions} />);

    const unionCard = screen
      .getByText('اتحادیه صنف رستوران‌داران')
      .closest('div');
    fireEvent.click(unionCard!);

    expect(
      screen.getByText('اتحادیه رسمی رستوران‌داران تهران')
    ).toBeInTheDocument();
    expect(screen.getByText('تاریخ تاسیس: 1390/01/01')).toBeInTheDocument();
  });
});
