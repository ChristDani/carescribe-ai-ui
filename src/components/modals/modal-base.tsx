import { FC } from "react";

interface ModalBackdropProps {
    onClose: () => void;
}

const ModalBackdrop: FC<ModalBackdropProps> = ({ onClose }) => {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-gray-700 bg-opacity-10 z-40 backdrop-blur-sm blur-2xl"
        />
    );
};

interface ModalBoxProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    primaryBtn?: btnProps;
    secondaryBtn?: btnProps[];
}

interface btnProps {
    text: string;
    disabled?: boolean;
    onClick: () => void;
}


const ModalBox: FC<ModalBoxProps> = ({ title, onClose, children, primaryBtn, secondaryBtn }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-lg shadow-lg w-auto max-w-[80%] pointer-events-auto">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <span className="text-lg font-semibold">{title}</span>
                    <span
                        onClick={onClose}
                        className="btn text-gray-500 hover:text-gray-700 text-xl font-bold focus:outline-none cursor-pointer"
                    >
                        &#10005;
                    </span>
                </div>
                <div className="p-6 overflow-y-auto max-h-[68vh]">
                    {children}
                </div>
                {
                    (primaryBtn || (secondaryBtn && secondaryBtn.length > 0)) && (
                        <div className="flex justify-end gap-2 border-t px-6 py-4">
                            {secondaryBtn && secondaryBtn.map((btn, index) => (
                                <button
                                    key={index}
                                    onClick={btn.onClick}
                                    disabled={btn.disabled}
                                    className={`px-4 py-2 rounded ${btn.disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} ${btn.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {btn.text}
                                </button>
                            ))}
                            {primaryBtn && (
                                <button
                                    onClick={primaryBtn.onClick}
                                    disabled={primaryBtn.disabled}
                                    className={`px-4 py-2 rounded ${primaryBtn.disabled ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500  hover:bg-blue-600'} ${primaryBtn.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {primaryBtn.text}
                                </button>
                            )}
                        </div>
                    )
                }

            </div>
        </div>
    );
};

interface ModalBaseProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    primaryBtn?: btnProps;
    secondaryBtn?: btnProps[];
}

const ModalBase: FC<ModalBaseProps> = ({ open, onClose, title, children, primaryBtn, secondaryBtn }) => {
    if (!open) return null;
    return (
        <>
            <ModalBackdrop onClose={onClose} />
            <ModalBox title={title} onClose={onClose} children={children} primaryBtn={primaryBtn} secondaryBtn={secondaryBtn} />
        </>
    );
}

export default ModalBase;