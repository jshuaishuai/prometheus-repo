import { useState } from "react";
import {
  ListObjectsCommandOutput,
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import "./App.css";

function App() {
  const [objects, setObjects] = useState<
    Required<ListObjectsCommandOutput>["Contents"]
  >([]);

  const [filePath, setFilePath] = useState('');

  const bucketName = 'file-ms';

  const s3Client = new S3Client({
    region: "us-west-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    }
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const newFilename = encodeURIComponent(`files/${file.name}`);
    try {
      const command = new PutObjectCommand({
        Body: file,
        ACL: 'public-read',
        Bucket: bucketName,
        Key: newFilename, // 设置文件在 S3 上的路径
        ContentType: file.type,
      });
      await s3Client?.send(command);
      const url = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      setFilePath(url);
      // 更新文件列表
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileUpload} />
      <p>{filePath}</p>
    </div>
  );
}

export default App;
