// Court process ordered list - under 50 lines per complexity rule
// Step-by-step process list

export default function CourtProcessList() {
  return (
    <ol style={{
      color: '#4b5563',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      fontSize: '1.03rem',
      paddingLeft: '1.5rem'
    }}>
      <li style={{ marginBottom: '0.75rem' }}>
        Filing a petition with the appropriate state court outlining the terms of the transfer.
      </li>
      <li style={{ marginBottom: '0.75rem' }}>
        Notifying all interested parties, including the original annuity issuer and any dependents.
      </li>
      <li style={{ marginBottom: '0.75rem' }}>
        Attending a court hearing where a judge will determine if the transfer is in the "best interest" of the payee and their family, considering their financial needs and circumstances.
      </li>
      <li style={{ marginBottom: '0.75rem' }}>
        Obtaining a court order approving (or denying) the transfer.
      </li>
    </ol>
  );
}
