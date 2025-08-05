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
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
