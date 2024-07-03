import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import Input from '../components/common/Input';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Normal: Story = {
  args: {
    type: 'text',
    label: 'Label',
    placeholder: 'PlaceHolder',
    description: 'description',
    value: 'value',
    isFull: 'fit',
    onChange: action('changed'),
  },
};
