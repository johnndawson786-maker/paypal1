import { ChangeEvent } from 'react';

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// Honeypot field - hidden from real users, but bots will fill it
const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <label htmlFor="contact_number">Phone (do not fill)</label>
      <input
        type="text"
        id="contact_number"
        name="contact_number"
        value={value}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
};

export default HoneypotField;
