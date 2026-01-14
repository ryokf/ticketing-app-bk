import { InputHTMLAttributes, forwardRef } from 'react';

interface BrutalistInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const BrutalistInput = forwardRef<HTMLInputElement, BrutalistInputProps>(
    ({ label, className = '', ...props }, ref) => {
        return (
            <div className="form-group">
                {label && (
                    <label className="form-brutalist">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`input-brutalist ${className}`.trim()}
                    {...props}
                />
            </div>
        );
    }
);

BrutalistInput.displayName = 'BrutalistInput';

export default BrutalistInput;
