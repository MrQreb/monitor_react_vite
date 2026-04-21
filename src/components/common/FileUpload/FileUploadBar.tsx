import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

type Props = {
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  multiple?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
};

export function FileUploadBar({
  maxFiles = 1,
  maxSizeMB = 4,
  accept = "*",
  multiple = true,
  value,
  onChange,
  className,
}: Props) {
  const [files, setFiles] = useState<File[]>(value ?? []);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // sincroniza con el padre si es controlado
  useEffect(() => {
    if (value) setFiles(value);
  }, [value]);

  const handleAccept = (newFiles: File[]) => {
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleReject = (file: File, message: string) => {
    toast.error(message, {
      description: `"${file.name}" fue rechazado`,
    });
  };

  return (
    <FileUpload
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSizeBytes}
      multiple={multiple}
      onAccept={handleAccept}
      onFileReject={handleReject}
      className={className ?? "w-full"}
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>

          <p className="font-medium text-sm">
            Arrastra archivos aquí
          </p>

          <p className="text-muted-foreground text-xs">
            Máx {maxFiles} archivo(s) · {maxSizeMB}MB c/u
          </p>
        </div>

        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Seleccionar
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />

              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}