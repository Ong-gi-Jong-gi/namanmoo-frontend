import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/common/Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    theme: 'primary',
    label: 'Button',
    onClick: action('clicked'),
  },
};

export const Neutral: Story = {
  args: {
    theme: 'neutral',
    label: 'Button',
    onClick: action('clicked'),
  },
};

export const Subtle: Story = {
  args: {
    theme: 'subtle',
    label: 'Button',
    onClick: action('clicked'),
  },
};
