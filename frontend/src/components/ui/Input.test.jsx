import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';

describe('Input Component', () => {
  it('renders correctly with a label', () => {
    render(<Input id="test-input" label="Test Label" />);
    
    // Check if label exists
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    
    // Check if input exists and is linked to the label
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('displays an error message when error prop is provided', () => {
    const errorProp = { message: 'This field is required' };
    render(<Input id="test-input" label="Test Label" error={errorProp} />);
    
    // Check if error message is displayed
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    
    // Check if input has the error styling (border-red-500)
    const input = screen.getByLabelText('Test Label');
    expect(input.className).toContain('border-red-500');
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef();
    render(<Input id="test-input" ref={ref} />);
    
    // The ref should point to the input element
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
