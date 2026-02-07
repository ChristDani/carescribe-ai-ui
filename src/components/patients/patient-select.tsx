import { useState, useMemo, FC, useImperativeHandle, forwardRef } from 'react';
import { Patient } from '../../types/patient';
interface PatientSelectProps {
    list: Patient[];
    selected: Patient;
    onSelect: (patient: Patient) => void;
    onClear?: () => void;
}

export interface PatientSelectRef {
    clear: () => void;
}

export const PatientSelect = forwardRef<PatientSelectRef, PatientSelectProps>(({
    list,
    selected,
    onSelect
}, ref) => {
    const [searchText, setSearchText] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Filtrar pacientes según el texto ingresado
    const filteredPatients = useMemo(() => {
        return list.filter(item =>
            item.fullName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText]);
    const onClear = () => {
        setSearchText('');
        onSelect({} as Patient);
        setIsDropdownOpen(false);
    }

    useImperativeHandle(ref, () => ({
        clear: () => onClear(),
    }), [onClear]);

    return (
        <div className='w-full max-w-md'>
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={selected.fullName || searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        if (e.target.value.length === 0) {
                            setIsDropdownOpen(false);
                        } else {
                            setIsDropdownOpen(true);
                        }
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => {
                        setTimeout(() =>
                            setIsDropdownOpen(false), 100)
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                {searchText && (
                    <span
                        onClick={() => {
                            setSearchText('');
                            onSelect({} as Patient);
                            setIsDropdownOpen(false);
                        }}
                        className="btn absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                        aria-label="Limpiar filtro"
                    >
                        &#10005;
                    </span>
                )}
                {isDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-lg z-10">
                        {filteredPatients.length > 0 ? (
                            <ul className="max-h-48 overflow-y-auto">
                                {filteredPatients.map((patient) => (
                                    <li
                                        key={patient.id}
                                        onClick={() => { onSelect(patient); setIsDropdownOpen(false); setSearchText(patient.fullName); }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${selected.fullName === patient.fullName ? 'bg-blue-100 font-semibold text-blue-700' : ''}`}
                                    >
                                        {patient.fullName}
                                    </li>
                                ))}
                            </ul>
                        ) : filteredPatients.length === 0 && list.length === 0 ? (
                            <p className="px-4 py-3 text-gray-500 text-center">No hay pacientes disponibles</p>
                        ) : (
                            <p className="px-4 py-3 text-gray-500 text-center">No hay pacientes que coincidan</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
);
