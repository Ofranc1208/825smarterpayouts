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
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <NameField formValidated={formValidated} />
        <EmailField formValidated={formValidated} />
      </div>
      <SubjectField formValidated={formValidated} />
      <MessageField formValidated={formValidated} />
    </>
  );
}
