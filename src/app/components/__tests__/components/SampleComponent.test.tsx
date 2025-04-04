// __tests__/components/MyComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SampleComponent from '../../SampleComponent';

describe('SampleComponent', () => {
  it('renders the provided name', () => {
    render(<SampleComponent name="John" />);
    expect(screen.getByText('Hello, John!')).toBeInTheDocument();
  });
});
