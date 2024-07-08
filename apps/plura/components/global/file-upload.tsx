"use client"
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/lib/uploadthing'


type Props = {
    apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
    onChange: (url?: string) => void
    value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
    const type = value?.split('.').pop()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    if (value) {
        return (
            <div className="flex flex-col justify-center items-center">
                {type !== 'pdf' ? (
                    <div className="relative w-40 h-40">
                        <Image
                            src={value}
                            alt="uploaded image"
                            className="object-contain"
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                        <FileIcon />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener_noreferrer"
                            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                        >
                            View PDF
                        </a>
                    </div>
                )}
                <Button
                    onClick={() => onChange('')}
                    variant="ghost"
                    type="button"
                >
                    <X className="h-4 w-4" />
                    Remove Logo
                </Button>
            </div>
        )
    }
    return (
        <div className="w-full bg-muted/30">
            <UploadDropzone
                endpoint="agencyLogo"
                onClientUploadComplete={(res) => {
                    console.log('%c [ res ]-57', 'font-size:13px; background:pink; color:#bf2c9f;', res)
                    onChange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
                onUploadBegin={(name) => {
                    // Do something once upload begins
                    console.log("Uploading: ", name);
                }}
                onDrop={(acceptedFiles) => {
                    // Do something with the accepted files
                    console.log("Accepted files: ", acceptedFiles);
                }}

            />
        </div>
    )
}

export default FileUpload
