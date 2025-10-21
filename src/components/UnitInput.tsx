interface UnitInputProps {
    label: string;
    unit: string;
    value: string;
    placeholder: string;
    id: string;
    onChange: (value: string) => void;
}

export default function UnitInput({ label, unit, value, placeholder, id, onChange }: UnitInputProps) {
    return (
        <div className="input-section">
            <label htmlFor={id} className="form-label">
                {label}: {unit}
            </label>
            <input
                className="form-control"
                placeholder={placeholder}
                type="number"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
