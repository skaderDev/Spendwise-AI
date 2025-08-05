import React from "react";
import Papa from "papaparse";

export type Transaction = {
    Date: string;
    Description: string;
    Amount: string;
    Category?: string;
};

type FileUploadProps = {
    onParse: (data: Transaction[]) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onParse }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        Papa.parse<Transaction>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                onParse(results.data);
            },
        });
    };

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

        </div>
    );
};

export default FileUpload;
