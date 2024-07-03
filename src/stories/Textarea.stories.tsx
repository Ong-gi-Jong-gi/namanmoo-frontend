import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import Textarea from '../components/common/Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'placeholder',
    description: 'Description',
    value: '이건 기본',
    onChange: action('changed'),
  },
};
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'placeholder',
    description: 'Description',
    value: '이건 기본',
    disabled: true,
    onChange: action('changed'),
  },
};
