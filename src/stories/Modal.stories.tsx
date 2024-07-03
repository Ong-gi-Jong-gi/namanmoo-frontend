import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import ModalProvider from '../components/common/Modal';
import useModalStore from '../store/modalStore';

export default {
  title: 'Components/ModalProvider',
  component: ModalProvider,
  argTypes: {
    content: { control: 'text' },
    showCloseBtn: { control: 'boolean' },
  },
} as Meta<typeof ModalProvider>;

const Template: StoryFn<{ content: React.ReactNode; showCloseBtn: boolean }> = (
  args,
) => {
  const { openModal, closeModal } = useModalStore();

  React.useEffect(() => {
    openModal({
      content: args.content,
      showCloseBtn: args.showCloseBtn,
    });
    return () => closeModal(); // Cleanup on unmount
  }, [args.content, args.showCloseBtn, openModal, closeModal]);

  return <ModalProvider />;
};

export const Default = Template.bind({});
Default.args = {
  content: <div>This is a modal content</div>,
  showCloseBtn: true,
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  content: <div>This is a modal content without a close button</div>,
  showCloseBtn: false,
};
