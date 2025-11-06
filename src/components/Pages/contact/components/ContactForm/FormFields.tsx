'use client';
import NameField from './NameField';
import EmailField from './EmailField';
import SubjectField from './SubjectField';
import MessageField from './MessageField';

interface FormFieldsProps {
  formValidated: boolean;
}

export default function FormFields({ formValidated }: FormFieldsProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      <NameField formValidated={formValidated} />
      <EmailField formValidated={formValidated} />
      <SubjectField formValidated={formValidated} />
      <MessageField formValidated={formValidated} />
    </div>
  );
}
